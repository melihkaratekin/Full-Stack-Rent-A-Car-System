using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Business.Constants
{
    public static class ImagePath
    {
        public static string DefaultImagePath = Directory.GetCurrentDirectory() + "\\upload_images\\no-image.jpg";
        public static string UploadImagePath = Directory.GetCurrentDirectory() + "\\upload_images\\";
    }
}