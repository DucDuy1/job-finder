package JobFinder.exception;

import JobFinder.dto.response.BaseResponseDto;
import JobFinder.dto.response.MessageResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
@AllArgsConstructor
public class ResponseHandlerException {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public BaseResponseDto handleValidationExceptions(MethodArgumentNotValidException ex) {
        String error = ex.getBindingResult().getAllErrors().get(0).getDefaultMessage();
        BaseResponseDto errorResponse = new BaseResponseDto();
        errorResponse.setMessage(MessageResponse.Message.VALIDATION_ERROR + " " + error);
        errorResponse.setCode(MessageResponse.Code.VALIDATION_ERROR);
        return errorResponse;
    }

    @ExceptionHandler(SystemException.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public BaseResponseDto handleInternalServerErrorException(SystemException ex) {
        BaseResponseDto errorResponse = new BaseResponseDto();
        errorResponse.setMessage(MessageResponse.Message.INTERNAL_SERVER_ERROR);
        errorResponse.setCode(MessageResponse.Code.INTERNAL_SERVER_ERROR);
        return errorResponse;
    }

    @ExceptionHandler(HttpClientErrorException.BadRequest.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public BaseResponseDto handleBadRequestException(SystemException ex) {
        BaseResponseDto errorResponse = new BaseResponseDto();
        errorResponse.setMessage(MessageResponse.Message.BAD_REQUEST);
        errorResponse.setCode(MessageResponse.Code.BAD_REQUEST);
        return errorResponse;
    }

    @ExceptionHandler(HttpClientErrorException.NotFound.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public BaseResponseDto handleNotFoundException(SystemException ex) {
        BaseResponseDto errorResponse = new BaseResponseDto();
        errorResponse.setMessage(MessageResponse.Message.NOT_FOUND);
        errorResponse.setCode(MessageResponse.Code.NOT_FOUND);
        return errorResponse;
    }

    @ExceptionHandler(AuthenticationCredentialsNotFoundException.class)
    @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
    public BaseResponseDto handleAuthenticationException(AuthenticationCredentialsNotFoundException ex) {
        String error = ex.getMessage();
        BaseResponseDto errorResponse = new BaseResponseDto();
        errorResponse.setMessage(MessageResponse.Message.AUTHENTICATION_ERROR + " " + error);
        errorResponse.setCode(MessageResponse.Code.AUTHENTICATION_ERROR);
        return errorResponse;
    }

//    @ExceptionHandler(Exception.class)
//    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
//    public BaseResponseDto handleGenericException(Exception ex, WebRequest request) {
//        return BaseResponseDto.builder().message(ex.getMessage())
//                .code(MessageResponse.Code.INTERNAL_SERVER_ERROR).build();
//    }
}
