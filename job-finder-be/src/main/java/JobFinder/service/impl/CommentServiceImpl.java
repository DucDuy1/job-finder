package JobFinder.service.impl;

import JobFinder.config.BeanConfig;
import JobFinder.dto.CommentDto;
import JobFinder.dto.SearchDto;
import JobFinder.dto.response.BaseResponseDto;
import JobFinder.dto.response.ListResponseDto;
import JobFinder.dto.response.MessageResponse;
import JobFinder.entity.Comment;
import JobFinder.entity.Job;
import JobFinder.entity.User;
import JobFinder.exception.SystemException;
import JobFinder.repository.CommentRepository;
import JobFinder.repository.JobRepository;
import JobFinder.repository.UserRepository;
import JobFinder.service.CommentService;
import JobFinder.service.FileService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.NoResultException;
import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDateTime;

@Service
@Data
public class CommentServiceImpl implements CommentService {
    final BeanConfig modelMapper;
    final CommentRepository commentRepository;
    final UserRepository userRepository;
    final JobRepository jobRepository;
    final FileService fileService;

    @Override
    public Long create(CommentDto commentDto, Principal principal) {
        if (commentDto.getJob() == null || commentDto.getJob().getId() == null) {
            throw new IllegalArgumentException("Job ID must not be null");
        }
        String username = principal.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new SystemException(new BaseResponseDto(MessageResponse.Message.NOT_FOUND,
                        MessageResponse.Code.NOT_FOUND)));
        commentDto.setUser(user);
        Job job = jobRepository.findById(commentDto.getJob().getId())
                .orElseThrow(() -> new SystemException(new BaseResponseDto(MessageResponse.Message.NOT_FOUND,
                        MessageResponse.Code.NOT_FOUND)));
        commentDto.setJob(job);
        commentDto.setCreateAt(LocalDateTime.now());
        Comment comment = modelMapper.modelMapper().map(commentDto, Comment.class);
        commentRepository.save(comment);
        return comment.getId();
    }

    @Override
    public void update(CommentDto commentDto, Principal principal) {
        Job job = jobRepository.findById(commentDto.getJob().getId())
                .orElseThrow(() -> new SystemException(new BaseResponseDto(MessageResponse.Message.NOT_FOUND,
                        MessageResponse.Code.NOT_FOUND)));
        String username = principal.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new SystemException(new BaseResponseDto(MessageResponse.Message.NOT_FOUND,
                        MessageResponse.Code.NOT_FOUND)));
        Comment existingComment = commentRepository.findById(commentDto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Comment dont exist"));
        if (!existingComment.getUser().equals(user)) {
            throw new AccessDeniedException("Access Denied");
        }
        if (commentDto.getContent() == null || commentDto.getContent().isEmpty()) {
            commentDto.setContent(existingComment.getContent());
        }
        if (commentDto.getCreateAt() == null) {
            commentDto.setCreateAt(existingComment.getCreateAt());
        }
        if (commentDto.getUser() != null) {
            commentDto.setUser(existingComment.getUser());
        }
        if (commentDto.getJob() == null) {
            commentDto.setJob(existingComment.getJob());
        }
        commentDto.setUser(user);
        commentDto.setJob(job);
        modelMapper.modelMapper().map(commentDto, existingComment);
        commentRepository.save(existingComment);
    }

    @Override
    public void delete(Long id) {
        commentRepository.deleteById(id);
    }

    @Override
    public ListResponseDto<CommentDto> search(SearchDto searchDto) {
        Pageable pageable = PageRequest.of(searchDto.getPage(), searchDto.getSize());
        Page<Comment> page = commentRepository.findByContent(searchDto.getKeyWord(), pageable);
        Page<CommentDto> commentDtoPage = page.map(comment -> modelMapper.modelMapper().map(comment, CommentDto.class));
        return new ListResponseDto<>(commentDtoPage);
    }

    @Override
    public ListResponseDto<CommentDto> listComment(Pageable pageable) {
        Page<Comment> page = commentRepository.findAll(pageable);
        Page<CommentDto> commentDtoPage = page.map(comment -> modelMapper.modelMapper().map(comment, CommentDto.class));
        return new ListResponseDto<>(commentDtoPage);
    }

    @Override
    public CommentDto getId(Long id) {
        return commentRepository.findById(id).map(comment -> modelMapper.modelMapper().map(comment, CommentDto.class))
                .orElseThrow(NoResultException::new);
    }

    @Override
    public ListResponseDto<CommentDto> listJobId(Long jobId, Pageable pageable) {
        Page<Comment> page = commentRepository.findByJobId(jobId, pageable);
        Page<CommentDto> commentDtoPage = page.map(comment -> modelMapper.modelMapper().map(comment, CommentDto.class));
        return new ListResponseDto<>(commentDtoPage);
    }
}
