using Business.Abstract;
using Business.Constants;
using Core.Entities.Concrete;
using Core.Utilities.Results;
using Core.Utilities.Security.Hashing;
using Core.Utilities.Security.Jwt;
using Entities.DTOs;

namespace Business.Concrete
{
    public class AuthManager : IAuthService
    {


        private readonly IUserService _userService;
        private readonly ITokenHelper _tokenHelper;


        public AuthManager(IUserService userService, ITokenHelper tokenHelper)
        {
            _userService = userService;
            _tokenHelper = tokenHelper;
        }


        public IDataResult<AccessToken> CreateAccessToken(User user)
        {
            var claims = _userService.GetClaims(user);

            var accessToken = _tokenHelper.CreateToken(user, claims.Data);

            return new SuccessDataResult<AccessToken>(accessToken, Messages.TokenCreated);
        }


        public IDataResult<User> Login(UserForLoginDto userForLoginDto)
        {
            var userToCheck = _userService.GetByEmail(userForLoginDto.Email);

            if (userToCheck.Data == null)
            {
                return new ErrorDataResult<User>(Messages.UserNotFound);
            }

            if (!HashingHelper.VerifyPasswordHash(userForLoginDto.Password,
                                                  userToCheck.Data.PasswordHash,
                                                  userToCheck.Data.PasswordSalt))
            {
                return new ErrorDataResult<User>(Messages.WrongPassword);
            }

            return new SuccessDataResult<User>(userToCheck.Data, Messages.LoginSuccessful);
        }


        public IDataResult<User> Register(UserForRegisterDto userForRegisterDto)
        {
            HashingHelper.CreatePasswordHash(userForRegisterDto.Password,
                                             out byte[] passwordHash,
                                             out byte[] passwordSalt);
            var user = new User
            {
                Email = userForRegisterDto.Email,
                FirstName = userForRegisterDto.FirstName,
                LastName = userForRegisterDto.LastName,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Status = true
            };

            _userService.Add(user);

            return new SuccessDataResult<User>(user, Messages.Registered);
        }


        public IResult UserExists(string email)
        {
            if (_userService.GetByEmail(email).Data != null)
            {
                return new ErrorResult(Messages.UserAlreadyExists);
            }
            return new SuccessResult();
        }


        public IResult ChangePassword(UserForChangingPasswordDto userForChangingPasswordDto)
        {
            User userInfos = _userService.GetById(userForChangingPasswordDto.Id).Data;

            if (!HashingHelper.VerifyPasswordHash(userForChangingPasswordDto.CurrentPassword, 
                                                  userInfos.PasswordHash,
                                                  userInfos.PasswordSalt))
            {
                return new ErrorResult(Messages.CurrentPasswordIsWrong);
            }

            HashingHelper.CreatePasswordHash(userForChangingPasswordDto.NewPassword,
                                             out byte[] passwordHash,
                                             out byte[] passwordSalt);

            userInfos.PasswordHash = passwordHash;
            userInfos.PasswordSalt = passwordSalt;

            _userService.Update(userInfos);

            return new SuccessResult(Messages.PasswordUpdated);
        }


    }
}