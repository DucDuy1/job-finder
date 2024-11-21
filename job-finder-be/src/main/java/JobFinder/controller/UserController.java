package JobFinder.controller;

import JobFinder.dto.SearchDto;
import JobFinder.dto.UserDto;
import JobFinder.dto.response.ListResponseDto;
import JobFinder.dto.response.MessageResponse;
import JobFinder.dto.response.ResponseDto;
import JobFinder.service.UserService;
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
@RequestMapping(value = "/api/user")
@Data
public class UserController {

    final UserService userService;

    @PostMapping(value = "/create")
    public ResponseDto<UserDto> create(@Valid @ModelAttribute UserDto userDto,
                                       @RequestParam(name = "file") MultipartFile file,
                                       Principal principal) throws IOException {
        ResponseDto<UserDto> responseDto = new ResponseDto<>();
        responseDto.setMessage(MessageResponse.Message.SUCCESS);
        responseDto.setCode(MessageResponse.Code.SUCCESS);
        responseDto.setData(userDto);
        userDto.setId(userService.create(userDto, file, principal));
        return responseDto;
    }

    @GetMapping("/download")
    public void download(@RequestParam("avatarUrl") String avatarUrl, HttpServletResponse response) throws IOException {
        userService.download(avatarUrl, response);
    }

    @PutMapping(value = "/update")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'MEMBER', 'USER')")
    public ResponseDto<UserDto> update(@ModelAttribute UserDto userDto,
                                       @RequestParam(name = "file", required = false) MultipartFile file,
                                       @RequestParam(value = "oldPassword", required = false) String oldPassword,
                                       Principal principal) throws IOException {
        ResponseDto<UserDto> responseDto = new ResponseDto<>();
        responseDto.setMessage(MessageResponse.Message.SUCCESS);
        responseDto.setCode(MessageResponse.Code.SUCCESS);
        responseDto.setData(userDto);
        userService.update(userDto, file, principal, oldPassword);
        return responseDto;
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'MEMBER')")
    public ResponseDto<UserDto> delete(@PathVariable(value = "id") Long id) {
        ResponseDto<UserDto> responseDto = new ResponseDto<>();
        responseDto.setMessage(MessageResponse.Message.SUCCESS);
        responseDto.setCode(MessageResponse.Code.SUCCESS);
        userService.delete(id);
        return responseDto;
    }

    @PostMapping("/search")
    public ListResponseDto<UserDto> search(@RequestBody SearchDto searchDto) {
        return userService.search(searchDto);
    }

    @PostMapping("/list-user")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'MEMBER')")
    public ListResponseDto<UserDto> listUser(Pageable pageable, @RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "10") int size) {
        pageable = PageRequest.of(page, size);
        return userService.listUsers(pageable);
    }

    @GetMapping("/{id}")
    public ResponseDto<UserDto> getId(@PathVariable("id") Long id) {
        ResponseDto<UserDto> responseDto = new ResponseDto<>();
        responseDto.setMessage(MessageResponse.Message.SUCCESS);
        responseDto.setCode(MessageResponse.Code.SUCCESS);
        UserDto userDto = userService.getId(id);
        responseDto.setData(userDto);
        return responseDto;
    }
}
