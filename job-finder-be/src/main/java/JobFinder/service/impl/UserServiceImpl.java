package JobFinder.service.impl;

import JobFinder.config.BeanConfig;
import JobFinder.dto.SearchDto;
import JobFinder.dto.UserDto;
import JobFinder.dto.response.BaseResponseDto;
import JobFinder.dto.response.ListResponseDto;
import JobFinder.dto.response.MessageResponse;
import JobFinder.entity.User;
import JobFinder.enumerated.Role;
import JobFinder.exception.SystemException;
import JobFinder.repository.UserRepository;
import JobFinder.service.FileService;
import JobFinder.service.UserService;
import jakarta.persistence.NoResultException;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

@Service
@Data
public class UserServiceImpl implements UserService {
    final BeanConfig modelMapper;
    final UserRepository userRepository;
    final FileService fileService;

    @Override
    public Long create(UserDto userDto, MultipartFile file, Principal principal) throws IOException {
        if (userDto.getRole() == null) {
            userDto.setRole(Role.USER);
        } else {
            userDto.setRole(userDto.getRole());
        }
        if (file != null && !file.isEmpty()) {
            String fileName = fileService.uploadFile(file);
            userDto.setAvatarUrl(fileName);
        }
        User user = modelMapper.modelMapper().map(userDto, User.class);
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        userRepository.save(user);
        return user.getId();
    }

    public void download(String avatarUrl, HttpServletResponse response) throws IOException {
        fileService.downloadFile(avatarUrl, response);
    }

    @Override
    public void update(UserDto userDto, MultipartFile file, Principal principal, String oldPassword) throws IOException {
        User existingUser = userRepository.findById(userDto.getId())
                .orElseThrow(() -> new SystemException(new BaseResponseDto(
                        MessageResponse.Message.NOT_FOUND, MessageResponse.Code.NOT_FOUND)));
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if (userDto.getPassword() != null && !userDto.getPassword().isEmpty()) {
            if (oldPassword == null || !passwordEncoder.matches(oldPassword, existingUser.getPassword())) {
                throw new SystemException(new BaseResponseDto(
                        MessageResponse.Message.INVALID_PASSWORD, MessageResponse.Code.BAD_REQUEST));
            }
            userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
        } else {
            userDto.setPassword(existingUser.getPassword());
        }
        if (file != null && !file.isEmpty()) {
            String fileName = fileService.uploadFile(file); // Upload file
            userDto.setAvatarUrl(fileName); // update new URL avatar
        } else {
            userDto.setAvatarUrl(existingUser.getAvatarUrl()); // keep old avatar
        }

        // Xử lý các thông tin khác
        if (userDto.getEmail() == null || userDto.getEmail().isEmpty()) {
            userDto.setEmail(existingUser.getEmail());
        }
        if (userDto.getFullName() == null || userDto.getFullName().isEmpty()) {
            userDto.setFullName(existingUser.getFullName());
        }
        if (userDto.getAge() == null) {
            userDto.setAge(existingUser.getAge());
        }
        if (userDto.getRole() == null) {
            userDto.setRole(existingUser.getRole());
        }
        if (userDto.getUsername() == null || userDto.getUsername().isEmpty()) {
            userDto.setUsername(existingUser.getUsername());
        }
        existingUser.setPassword(userDto.getPassword());
        modelMapper.modelMapper().map(userDto, existingUser);
        userRepository.save(existingUser);
    }

    @Override
    public void delete(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found!"));
        user.setDeleted(true);
        userRepository.save(user);
    }

    @Override
    public ListResponseDto<UserDto> search(SearchDto searchDto) {
        Pageable pageable = PageRequest.of(searchDto.getPage(), searchDto.getSize());
        Page<User> page = userRepository.findByUsername(searchDto.getKeyWord(), pageable);
        Page<UserDto> userDtoPage = page.map(user -> modelMapper.modelMapper().map(user, UserDto.class));
        return new ListResponseDto<>(userDtoPage);
    }

    @Override
    public ListResponseDto<UserDto> listUsers(Pageable pageable) {
        Page<User> page = userRepository.findAll(pageable);
        Page<UserDto> userDtoPage = page.map(user -> modelMapper.modelMapper().map(user, UserDto.class));
        return new ListResponseDto<>(userDtoPage);
    }

    @Override
    public UserDto getId(Long id) {
        return userRepository.findById(id).map(user -> modelMapper.modelMapper().map(user, UserDto.class))
                .orElseThrow(NoResultException::new);
    }
}
