package software.project.project.controller;

import org.springframework.web.bind.annotation.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import software.project.project.component.mail.Mail;
import software.project.project.component.mail.MailCheck;
import software.project.project.component.mail.MailResponse;
import software.project.project.component.mail.MailService;

@RestController
public class MailController {
    @Autowired
    private MailService MailService;

    @PostMapping("/mail")
    public ResponseEntity<Mail> mail(@RequestBody Mail request) {
        System.out.println(request.getReceivers());
        return ResponseEntity.ok(MailService.sendMail(request));
    }

    @PostMapping("/mail/check")
    public ResponseEntity<MailResponse> mailCheck(@RequestBody MailCheck request) {
        boolean flag = MailService.mailCheck(request.getVerifyCode(), request.getEmail());
        MailResponse response = new MailResponse(flag);
        if (flag)
            return ResponseEntity.ok(response);
        else
            return ResponseEntity.badRequest().body(response);
    }
}
