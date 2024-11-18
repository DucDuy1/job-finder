package JobFinder.service.impl;

import JobFinder.config.BeanConfig;
import JobFinder.dto.ApplyDto;
import JobFinder.dto.SearchDto;
import JobFinder.dto.response.BaseResponseDto;
import JobFinder.dto.response.ListResponseDto;
import JobFinder.dto.response.MessageResponse;
import JobFinder.entity.Apply;
import JobFinder.entity.Job;
import JobFinder.entity.User;
import JobFinder.exception.SystemException;
import JobFinder.repository.ApplyRepository;
import JobFinder.repository.JobRepository;
import JobFinder.repository.UserRepository;
import JobFinder.service.ApplyService;
import JobFinder.service.FileService;
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

@Data
@Service
public class ApplyServiceImpl implements ApplyService {
    final BeanConfig modelMapper;
    final ApplyRepository applyRepository;
    final UserRepository userRepository;
    final JobRepository jobRepository;
    final FileService fileService;

    @Override
    public Long create(ApplyDto applyDto, MultipartFile file, Principal principal) throws IOException {
        String username = principal.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new SystemException(new BaseResponseDto(MessageResponse.Message.NOT_FOUND,
                        MessageResponse.Code.NOT_FOUND)));
        Job job = jobRepository.findById(applyDto.getJob().getId())
                .orElseThrow(() -> new SystemException(new BaseResponseDto(MessageResponse.Message.NOT_FOUND,
                        MessageResponse.Code.NOT_FOUND)));
        if (file != null && !file.isEmpty()) {
            String fileName = fileService.uploadFile(file);
            applyDto.setFileCV(fileName);
        }
        applyDto.setUser(user);
        applyDto.setJob(job);
        Apply apply = modelMapper.modelMapper().map(applyDto, Apply.class);
        applyRepository.save(apply);
        return apply.getId();
    }

    public void download(String fileCV, HttpServletResponse response) throws IOException {
        fileService.downloadFile(fileCV, response);
    }

    @Override
    public void update(ApplyDto applyDto, MultipartFile file, Principal principal) throws IOException {
        Apply apply = applyRepository.findById(applyDto.getId())
                .orElseThrow(() -> new SystemException(new BaseResponseDto(MessageResponse.Message.NOT_FOUND,
                        MessageResponse.Code.NOT_FOUND)));
        String username = principal.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new SystemException(new BaseResponseDto(MessageResponse.Message.NOT_FOUND,
                        MessageResponse.Code.NOT_FOUND)));
        if (file != null && !file.isEmpty()) {
            String fileName = fileService.uploadFile(file);
            applyDto.setFileCV(fileName);
        }
        Job job = jobRepository.findById(applyDto.getJob().getId())
                .orElseThrow(() -> new SystemException(new BaseResponseDto(MessageResponse.Message.NOT_FOUND,
                        MessageResponse.Code.NOT_FOUND)));
        if (applyDto.getUser() == null) {
            applyDto.setUser(apply.getUser());
        }
        if (applyDto.getJob() == null) {
            applyDto.setJob(apply.getJob());
        }
        applyDto.setUser(user);
        applyDto.setJob(job);
        modelMapper.modelMapper().map(applyDto, apply);
        applyRepository.save(apply);
    }

    @Override
    public void delete(Long id) {
       Apply apply = applyRepository.findById(id)
               .orElseThrow(() -> new RuntimeException("id not found"));
       apply.setDeleted(true);
    }

    @Override
    public ListResponseDto<ApplyDto> search(SearchDto searchDto) {
        Pageable pageable = PageRequest.of(searchDto.getPage(), searchDto.getSize());
        Page<Apply> page = applyRepository.findByFileCV(searchDto.getKeyWord(), pageable);
        Page<ApplyDto> aplApplyDtoPage = page.map(comment -> modelMapper.modelMapper().map(comment, ApplyDto.class));
        return new ListResponseDto<>(aplApplyDtoPage);
    }

    @Override
    public ListResponseDto<ApplyDto> listAplly(Pageable pageable) {
        Page<Apply> page = applyRepository.findAll(pageable);
        Page<ApplyDto> aplApplyDtoPage = page.map(comment -> modelMapper.modelMapper().map(comment, ApplyDto.class));
        return new ListResponseDto<>(aplApplyDtoPage);
    }

    @Override
    public ApplyDto getId(Long id) {
        return applyRepository.findById(id).map(apply -> modelMapper.modelMapper().map(apply, ApplyDto.class))
                .orElseThrow(NoResultException::new);
    }

    @Override
    public ListResponseDto<ApplyDto> listApplyByUserId(Long userId, Pageable pageable) {
        Page<Apply> page = applyRepository.findByUserId(userId, pageable);
        Page<ApplyDto> applyDtoPage = page.map(apply -> modelMapper.modelMapper().map(apply, ApplyDto.class));
        return new ListResponseDto<>(applyDtoPage);
    }

    @Override
    public ListResponseDto<ApplyDto> listApplyByJobId(Long jobId, Pageable pageable) {
        Page<Apply> page = applyRepository.findByJobId(jobId, pageable);
        Page<ApplyDto> applyDtoPage = page.map(apply -> modelMapper.modelMapper().map(apply, ApplyDto.class));
        return new ListResponseDto<>(applyDtoPage);
    }
}
