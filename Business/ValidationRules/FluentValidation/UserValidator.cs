using Entities.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.ValidationRules.FluentValidation
{
    public class UserValidator : AbstractValidator<User>
    {
        public UserValidator()
        {
            RuleFor(u => u.FirstName).NotEmpty();
            RuleFor(u => u.LastName).NotEmpty();

            RuleFor(u => u.Email).NotEmpty();
            RuleFor(u => u.Email).MinimumLength(5);

            RuleFor(u => u.Password).NotEmpty();
            RuleFor(u => u.Password).MinimumLength(5);
        }
    }
}
