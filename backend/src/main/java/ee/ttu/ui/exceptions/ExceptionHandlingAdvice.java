package ee.ttu.ui.exceptions;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Controller
public class ExceptionHandlingAdvice {

    @ExceptionHandler(Exception.class)
    public String error (Exception ex) {
        return "Things have died. RIP";
    }
}
