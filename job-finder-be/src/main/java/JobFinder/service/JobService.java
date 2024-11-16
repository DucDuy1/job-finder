package JobFinder.service;

import JobFinder.dto.JobDto;
import JobFinder.dto.SearchDto;
import JobFinder.dto.response.ListResponseDto;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

@Service
public interface JobService {
    Long create(JobDto jobDto, MultipartFile file, Principal principal) throws IOException;

    void download(String imageUrl, HttpServletResponse response) throws IOException;

    void update(JobDto jobDto, MultipartFile file, Principal principal) throws IOException;

    void delete(Long id);

    ListResponseDto<JobDto> search(SearchDto searchDto);

    ListResponseDto<JobDto> searchJobs(String title, String nameCompany, String tag, String level,
                                       String employmentType,
                                       String location,
                                       Pageable pageable);

    ListResponseDto<JobDto> listJob(Pageable pageable);

    ListResponseDto<JobDto> listJobByUserId(Long userId, Pageable pageable);

    JobDto getId(Long id);
}
