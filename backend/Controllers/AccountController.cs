using backend.Dto;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("/api")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IEmailSender _emailSender;

        public AccountController(UserManager<ApplicationUser> userManager, IEmailSender emailSender)
        {
            _userManager = userManager;
            _emailSender = emailSender;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterDto model)
        {
            var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var callbackUrl = Url.Action(
                    "ConfirmEmail",
                    "Account",
                    new { userId = user.Id, token },
                    protocol: HttpContext.Request.Scheme);

                var message = new Message(new string[] { model.Email }, "Confirm your email", $"Please confirm your account by clicking this link: <a href='{callbackUrl}'>link</a>", null);

                await _emailSender.SendEmailAsync(message);

                return Ok("Registration successful. Please check your email to confirm your account.");
            }

            return BadRequest(result.Errors);
        }


        [HttpGet]
        [Route("confirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string userId, string token)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return BadRequest("Invalid user ID");

            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
                return Ok("Email confirmed successfully!");

            return BadRequest("Error confirming email.");
        }


        [HttpPost]
        [Route("forgotPassword")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
            {
                // Ne pas révéler si l'utilisateur existe ou non pour des raisons de sécurité
                return Ok();
            }
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var url = new Uri($"http://localhost:4200/reset-password?resetCode={token}&email={model.Email}");

            var message = new Message(new string[] { model.Email }, "Reset Password", $"Please reset your password by clicking this link: <a href='{url}'>link</a>", null);


            await _emailSender.SendEmailAsync(message);

            return Ok("Password reset link sent to your email.");
        }

        [HttpPost]
        [Route("resetPassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return BadRequest("Invalid user.");
            }

            var result = await _userManager.ResetPasswordAsync(user, model.ResetCode, model.NewPassword);
            if (result.Succeeded)
            {
                return Ok("Password has been reset successfully.");
            }

            return BadRequest(result.Errors);
        }


    }
}

