package JobFinder.exception;

import JobFinder.dto.response.BaseResponseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class SystemException extends RuntimeException {
    private BaseResponseDto baseResponseDto;
    public SystemException(BaseResponseDto baseResponseDto) {
        this.baseResponseDto = baseResponseDto;
    }
}
