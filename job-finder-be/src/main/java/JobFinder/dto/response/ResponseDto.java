package JobFinder.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseDto<T> extends BaseResponseDto {
    private T data;

    public ResponseDto() {
    }
}
