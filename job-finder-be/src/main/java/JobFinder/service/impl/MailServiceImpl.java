package JobFinder.service.impl;

import JobFinder.entity.User;
import JobFinder.service.MailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;

@Data
@Service
public class MailServiceImpl implements MailService {

    private static Logger logger = LoggerFactory.getLogger(MailServiceImpl.class);

    @Autowired(required = false)
    final JavaMailSender javaMailSender;

    @Override
    public void sendEmail(String to, String subject, String body) {
        logger.debug("Preparing to send email to: {}", to);
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, StandardCharsets.UTF_8.name());
            helper.setTo(to);
            helper.setText(body, true);
            helper.setSubject(subject);
            helper.setFrom("doducduy1159@gmail.com");
            javaMailSender.send(message);
            logger.info("Email successfully sent to: {}", to);
        } catch (MessagingException e) {
            logger.error("Failed to send email to: {}. Error: {}", to, e.getMessage());
            e.printStackTrace();
        }
    }

    @Override
    public void sendPasswordResetCode(User user, String code) {
        String subject = "OTP to reset your password";
        String body = "OTP to reset your password: " + code + "<br>" + "OTP code is valid for 30 minutes";
        logger.debug("Sending password reset code to user: {} with code: {}", user.getEmail(), code);
        sendEmail(user.getEmail(), subject, body);
    }
}
