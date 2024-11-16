package JobFinder.service;

import JobFinder.dto.CommentDto;
import JobFinder.dto.SearchDto;
import JobFinder.dto.response.ListResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
public interface CommentService {
    Long create(CommentDto commentDto, Principal principal);

    void update(CommentDto commentDto, Principal principal);

    void delete(Long id);

    ListResponseDto<CommentDto> search(SearchDto searchDto);

    ListResponseDto<CommentDto> listComment(Pageable pageable);

    ListResponseDto<CommentDto> listJobId(Long jobId, Pageable pageable);

    CommentDto getId(Long id);
}
