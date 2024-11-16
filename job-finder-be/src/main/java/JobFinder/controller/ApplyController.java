package JobFinder.controller;

import JobFinder.dto.ApplyDto;
import JobFinder.dto.SearchDto;
import JobFinder.dto.response.ListResponseDto;
import JobFinder.dto.response.MessageResponse;
import JobFinder.dto.response.ResponseDto;
import JobFinder.service.ApplyService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.Data;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

@RestController
@RequestMapping(value = "/api/apply")
@Data
public class ApplyController {
    final ApplyService applyService;

    @PostMapping(value = "/create", consumes = {"multipart/form-data"})
    public ResponseDto<ApplyDto> create(@Valid @ModelAttribute ApplyDto applyDto,
                                        @RequestParam(name = "file") MultipartFile file,
                                        Principal principal) throws IOException {
        ResponseDto<ApplyDto> responseDto = new ResponseDto<>();
        responseDto.setMessage(MessageResponse.Message.SUCCESS);
        responseDto.setCode(MessageResponse.Code.SUCCESS);
        responseDto.setData(applyDto);
        applyService.create(applyDto, file, principal);
        return responseDto;
    }

    @GetMapping("/download")
    public void download(@RequestParam("fileCV") String fileCV, HttpServletResponse response) throws IOException {
        applyService.download(fileCV, response);
    }

    @PutMapping("/update")
    public ResponseDto<ApplyDto> update(@Valid @ModelAttribute ApplyDto applyDto,
                                        @RequestParam(name = "file") MultipartFile file,
                                        Principal principal) throws IOException {
        ResponseDto<ApplyDto> responseDto = new ResponseDto<>();
        responseDto.setMessage(MessageResponse.Message.SUCCESS);
        responseDto.setCode(MessageResponse.Code.SUCCESS);
        responseDto.setData(applyDto);
        applyService.update(applyDto, file, principal);
        return responseDto;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseDto<ApplyDto> delete(@PathVariable(value = "id") Long id) {
        ResponseDto<ApplyDto> responseDto = new ResponseDto<>();
        responseDto.setMessage(MessageResponse.Message.SUCCESS);
        responseDto.setCode(MessageResponse.Code.SUCCESS);
        applyService.delete(id);
        return responseDto;
    }

    @PostMapping("/search")
    public ListResponseDto<ApplyDto> search(@RequestBody SearchDto searchDto) {
        return applyService.search(searchDto);
    }

    @PostMapping("/list-apply")
    public ListResponseDto<ApplyDto> listUser(Pageable pageable, @RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "10") int size) {
        pageable = PageRequest.of(page, size);
        return applyService.listAplly(pageable);
    }

    @GetMapping("/{id}")
    public ResponseDto<ApplyDto> getId(@PathVariable("id") Long id) {
        ResponseDto<ApplyDto> responseDto = new ResponseDto<>();
        responseDto.setMessage(MessageResponse.Message.SUCCESS);
        responseDto.setCode(MessageResponse.Code.SUCCESS);
        ApplyDto applyDto = applyService.getId(id);
        responseDto.setData(applyDto);
        return responseDto;
    }

    @GetMapping("/user/{id}")
    public ListResponseDto<ApplyDto> listApplyByUserId(
            @PathVariable("id") Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return applyService.listApplyByUserId(userId, pageable);
    }

    @GetMapping("/job/{id}")
    public ListResponseDto<ApplyDto> listApplyByJobId(
            @PathVariable("id") Long jobId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return applyService.listApplyByJobId(jobId, pageable);
    }
}
