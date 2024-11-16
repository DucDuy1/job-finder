package JobFinder.controller;

import JobFinder.dto.JobDto;
import JobFinder.dto.SearchDto;
import JobFinder.dto.response.ListResponseDto;
import JobFinder.dto.response.MessageResponse;
import JobFinder.dto.response.ResponseDto;
import JobFinder.service.JobService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.Data;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

@RestController
@RequestMapping(value = "/api/job")
@Data
public class JobController {
    final JobService jobService;

    @PostMapping(value = "/create", consumes = {"multipart/form-data"})
    @PreAuthorize("hasAnyAuthority('ADMIN','MEMBER')")
    public ResponseDto<JobDto> create(@Valid @ModelAttribute JobDto jobDto,
                                      @RequestParam(name = "file") MultipartFile file,
                                      Principal principal) throws IOException {
        ResponseDto<JobDto> responseDto = new ResponseDto<>();
        responseDto.setMessage(MessageResponse.Message.SUCCESS);
        responseDto.setCode(MessageResponse.Code.SUCCESS);
        responseDto.setData(jobDto);
        jobService.create(jobDto, file, principal);
        return responseDto;
    }

    @GetMapping("/download")
    public void download(@RequestParam("imageUrl") String imageUrl, HttpServletResponse response) throws IOException {
        jobService.download(imageUrl, response);
    }

    @PutMapping("/update")
    public ResponseDto<JobDto> update(@Valid @ModelAttribute JobDto jobDto,
                                      @RequestParam(name = "file", required = false) MultipartFile file,
                                      Principal principal) throws IOException {
        ResponseDto<JobDto> responseDto = new ResponseDto<>();
        responseDto.setMessage(MessageResponse.Message.SUCCESS);
        responseDto.setCode(MessageResponse.Code.SUCCESS);
        responseDto.setData(jobDto);
        jobService.update(jobDto, file, principal);
        return responseDto;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseDto<JobDto> delete(@PathVariable(value = "id") Long id) {
        ResponseDto<JobDto> responseDto = new ResponseDto<>();
        responseDto.setMessage(MessageResponse.Message.SUCCESS);
        responseDto.setCode(MessageResponse.Code.SUCCESS);
        jobService.delete(id);
        return responseDto;
    }

    @PostMapping("/search")
    public ListResponseDto<JobDto> search(@RequestBody SearchDto searchDto) {
        return jobService.search(searchDto);
    }

    @PostMapping("/search-multi")
    public ListResponseDto<JobDto> searchJobs(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String nameCompany,
            @RequestParam(required = false) String tag,
            @RequestParam(required = false) String level,
            @RequestParam(required = false) String employmentType,
            @RequestParam(required = false) String location,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return jobService.searchJobs(title, nameCompany, tag, level, employmentType, location, pageable);
    }

    @PostMapping("/list-job")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ListResponseDto<JobDto> listUser(Pageable pageable, @RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "10") int size) {
        pageable = PageRequest.of(page, size);
        return jobService.listJob(pageable);
    }

    @GetMapping("/{id}")
    public ResponseDto<JobDto> getId(@PathVariable("id") Long id) {
        ResponseDto<JobDto> responseDto = new ResponseDto<>();
        responseDto.setMessage(MessageResponse.Message.SUCCESS);
        responseDto.setCode(MessageResponse.Code.SUCCESS);
        JobDto jobDto = jobService.getId(id);
        responseDto.setData(jobDto);
        return responseDto;
    }

    @GetMapping("/user/{id}")
    public ListResponseDto<JobDto> listJobByUserId(
            @PathVariable("id") Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return jobService.listJobByUserId(userId, pageable);
    }
}
