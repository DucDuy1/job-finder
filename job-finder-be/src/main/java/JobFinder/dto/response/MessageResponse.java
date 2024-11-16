package JobFinder.dto.response;

import lombok.Data;

@Data
public class MessageResponse {
    public static class Message {
        public final static String SUCCESS = "SUCCESS";
        public static final String NOT_FOUND = "NOT_FOUND";
        public final static String INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR";
        public final static String BAD_REQUEST = "BAD_REQUEST";
        public final static String VALIDATION_ERROR  = "Validation_Failed";
        public final static String AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR";
        public final static String INVALID_PASSWORD = "INVALID_PASSWORD";
    }

    public static class Code {
        public final static String INTERNAL_SERVER_ERROR = "500";
        public final static String BAD_REQUEST = "400";
        public final static String VALIDATION_ERROR  = "400";
        public final static String NOT_FOUND = "404";
        public final static String AUTHENTICATION_ERROR = "401";
        public final static String SUCCESS = "200";
    }
}
