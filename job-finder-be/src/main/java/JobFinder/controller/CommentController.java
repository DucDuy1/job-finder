package JobFinder.controller;

import JobFinder.dto.CommentDto;
import JobFinder.dto.SearchDto;
import JobFinder.dto.response.ListResponseDto;
import JobFinder.dto.response.MessageResponse;
import JobFinder.dto.response.ResponseDto;
import JobFinder.service.CommentService;
import jakarta.validation.Valid;
import lombok.Data;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping(value = "/api/comment")
@Data
public class CommentController {
    final CommentService commentService;

    @PostMapping("/create")
    public ResponseDto<CommentDto> create(@Valid @RequestBody CommentDto commentDto, Principal principal) {
        ResponseDto<CommentDto> responseDto = new ResponseDto<>();
        responseDto.setMessage(MessageResponse.Message.SUCCESS);
        responseDto.setCode(MessageResponse.Code.SUCCESS);
        responseDto.setData(commentDto);
        commentService.create(commentDto, principal);
        return responseDto;
    }

    @PutMapping("/update")
    public ResponseDto<CommentDto> update(@Valid @RequestBody CommentDto commentDto, Principal principal) {
        ResponseDto<CommentDto> responseDto = new ResponseDto<>();
        responseDto.setMessage(MessageResponse.Message.SUCCESS);
        responseDto.setCode(MessageResponse.Code.SUCCESS);
        responseDto.setData(commentDto);
        commentService.update(commentDto, principal);
        return responseDto;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseDto<CommentDto> delete(@PathVariable(value = "id") Long id) {
        ResponseDto<CommentDto> responseDto = new ResponseDto<>();
        responseDto.setMessage(MessageResponse.Message.SUCCESS);
        responseDto.setCode(MessageResponse.Code.SUCCESS);
        commentService.delete(id);
        return responseDto;
    }

    @PostMapping("/search")
    public ListResponseDto<CommentDto> search(@RequestBody SearchDto searchDto) {
        return commentService.search(searchDto);
    }

    @PostMapping("/list-comment")
    public ListResponseDto<CommentDto> listUser(Pageable pageable, @RequestParam(defaultValue = "0") int page,
                                                @RequestParam(defaultValue = "10") int size) {
        pageable = PageRequest.of(page, size);
        return commentService.listComment(pageable);
    }

    @GetMapping("/{id}")
    public ResponseDto<CommentDto> getId(@PathVariable("id") Long id) {
        ResponseDto<CommentDto> responseDto = new ResponseDto<>();
        responseDto.setMessage(MessageResponse.Message.SUCCESS);
        responseDto.setCode(MessageResponse.Code.SUCCESS);
        CommentDto commentDto = commentService.getId(id);
        responseDto.setData(commentDto);
        return responseDto;
    }

    @GetMapping("/job/{id}")
    public ListResponseDto<CommentDto> listJobId(
            @PathVariable("id") Long jobId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return commentService.listJobId(jobId, pageable);
    }
}
