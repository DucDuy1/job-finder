package JobFinder.service.impl;

import JobFinder.config.BeanConfig;
import JobFinder.dto.JobDto;
import JobFinder.dto.SearchDto;
import JobFinder.dto.response.BaseResponseDto;
import JobFinder.dto.response.ListResponseDto;
import JobFinder.dto.response.MessageResponse;
import JobFinder.entity.Job;
import JobFinder.entity.User;
import JobFinder.exception.SystemException;
import JobFinder.repository.JobRepository;
import JobFinder.repository.UserRepository;
import JobFinder.service.FileService;
import JobFinder.service.JobService;
import jakarta.persistence.NoResultException;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

@Service
@Data
public class JobServiceImpl implements JobService {
    final BeanConfig modelMapper;
    final FileService fileService;
    final JobRepository jobRepository;
    final UserRepository userRepository;

    @Override
    public Long create(JobDto jobDto, MultipartFile file, Principal principal) throws IOException {
        String username = principal.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new SystemException(new BaseResponseDto(MessageResponse.Message.NOT_FOUND,
                        MessageResponse.Code.NOT_FOUND)));
        if (file != null && !file.isEmpty()) {
            String fileName = fileService.uploadFile(file);
            jobDto.setImageUrl(fileName);
        }
        jobDto.setUser(user);
        Job job = modelMapper.modelMapper().map(jobDto, Job.class);
        jobRepository.save(job);
        return job.getId();
    }

    public void download(String imageUrl, HttpServletResponse response) throws IOException {
        fileService.downloadFile(imageUrl, response);
    }

    @Override
    public void update(JobDto jobDto, MultipartFile file, Principal principal) throws IOException {
        Job existingJob = jobRepository.findById(jobDto.getId())
                .orElseThrow(() -> new SystemException(new BaseResponseDto(MessageResponse.Message.NOT_FOUND,
                        MessageResponse.Code.NOT_FOUND)));
        String username = principal.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new SystemException(new BaseResponseDto(MessageResponse.Message.NOT_FOUND,
                        MessageResponse.Code.NOT_FOUND)));
        jobDto.setUser(user);
        if (file != null && !file.isEmpty()) {
            String fileName = fileService.uploadFile(file);
            jobDto.setImageUrl(fileName);
        } else {
            jobDto.setImageUrl(existingJob.getImageUrl());
        }
        if (jobDto.getNameCompany() == null || jobDto.getNameCompany().isEmpty()) {
            jobDto.setNameCompany(existingJob.getNameCompany());
        }
        if (jobDto.getApplicationDeadline() == null) {
            jobDto.setApplicationDeadline(existingJob.getApplicationDeadline());
        }
        if (jobDto.getTitle() == null || jobDto.getTitle().isEmpty()) {
            jobDto.setTitle(existingJob.getTitle());
        }
        if (jobDto.getDescription() == null || jobDto.getDescription().isEmpty()) {
            jobDto.setDescription(existingJob.getDescription());
        }
        if (jobDto.getLocation() == null || jobDto.getLocation().isEmpty()) {
            jobDto.setLocation(existingJob.getLocation());
        }
        if (jobDto.getUser() == null) {
            jobDto.setUser(existingJob.getUser());
        }
        if (jobDto.getTag() == null || jobDto.getTag().isEmpty()) {
            jobDto.setTag(existingJob.getTag());
        }
        Job updatedJob = modelMapper.modelMapper().map(jobDto, Job.class);
        jobRepository.save(updatedJob);
    }

    @Override
    public void delete(Long id) {
        jobRepository.deleteById(id);
    }

    @Override
    public ListResponseDto<JobDto> search(SearchDto searchDto) {
        Pageable pageable = PageRequest.of(searchDto.getPage(), searchDto.getSize());
        Page<Job> page = jobRepository.findByKeyword(searchDto.getKeyWord(), pageable);
        Page<JobDto> jobDtoPage = page.map(job -> modelMapper.modelMapper().map(job, JobDto.class));
        return new ListResponseDto<>(jobDtoPage);
    }

    @Override
    public ListResponseDto<JobDto> searchJobs(String title, String nameCompany, String tag, String level,
                                              String employmentType,
                                              String location,
                                              Pageable pageable) {
        String titleLower = (title != null && !title.trim().isEmpty()) ? title.toLowerCase() : null;
        String tagLower = (tag != null && !tag.trim().isEmpty()) ? tag.toLowerCase() : null;
        String locationLower = (location != null && !location.trim().isEmpty()) ? location.toLowerCase() : null;
        String nameCompanyLower = (nameCompany != null && !nameCompany.trim().isEmpty()) ? nameCompany.toLowerCase() : null;
        String employmentTypeLower = (employmentType != null && !employmentType.trim().isEmpty()) ? employmentType.toLowerCase() : null;
        String levelLower = (level != null && !level.trim().isEmpty()) ? level.toLowerCase() : null;

        Page<Job> jobPage = jobRepository.searchJobs(titleLower, nameCompanyLower, tagLower, levelLower,
                employmentTypeLower, locationLower, pageable);
        Page<JobDto> jobDtoPage = jobPage.map(job -> modelMapper.modelMapper().map(job, JobDto.class));
        return new ListResponseDto<>(jobDtoPage);
    }

    @Override
    public ListResponseDto<JobDto> listJob(Pageable pageable) {
        Page<Job> page = jobRepository.findAll(pageable);
        Page<JobDto> jobDtoPage = page.map(job -> modelMapper.modelMapper().map(job, JobDto.class));
        return new ListResponseDto<>(jobDtoPage);
    }

    @Override
    public JobDto getId(Long id) {
        return jobRepository.findById(id).map(job -> modelMapper.modelMapper().map(job, JobDto.class))
                .orElseThrow(NoResultException::new);
    }

    @Override
    public ListResponseDto<JobDto> listJobByUserId(Long userId, Pageable pageable) {
        Page<Job> page = jobRepository.findByUserId(userId, pageable);
        Page<JobDto> jobDtoPage = page.map(job -> modelMapper.modelMapper().map(job, JobDto.class));
        return new ListResponseDto<>(jobDtoPage);
    }
}
