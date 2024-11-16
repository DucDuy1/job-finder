package JobFinder.service;

import JobFinder.dto.ApplyDto;
import JobFinder.dto.SearchDto;
import JobFinder.dto.response.ListResponseDto;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

public interface ApplyService {
    Long create(ApplyDto applyDto, MultipartFile file, Principal principal) throws IOException;

    void download(String imageUrl, HttpServletResponse response) throws IOException;

    void update(ApplyDto applyDto, MultipartFile file, Principal principal) throws IOException;

    void delete(Long id);

    ListResponseDto<ApplyDto> search(SearchDto searchDto);

    ListResponseDto<ApplyDto> listAplly(Pageable pageable);

    ApplyDto getId(Long id);

    ListResponseDto<ApplyDto> listApplyByUserId(Long userId, Pageable pageable);

    ListResponseDto<ApplyDto> listApplyByJobId(Long jobId, Pageable pageable);
}
