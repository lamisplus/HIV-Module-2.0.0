package org.lamisplus.modules.hiv.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.hiv.dto.LinkageRequest;
import org.lamisplus.modules.hiv.dto.LinkageResponse;
import org.lamisplus.modules.hiv.entity.Linkage;
import org.lamisplus.modules.hiv.service.LinkageService;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.util.*;
import java.util.stream.Collectors;

@RequestMapping("/api/v1/linkages")
@RestController
@RequiredArgsConstructor
@Api
@Slf4j
public class LinkageController {
    private final LinkageService linkageService;

    @GetMapping("/{id}")
    @ApiOperation(value = "Find an existing linkage")
    public ResponseEntity<LinkageResponse> findById(@PathVariable("id") UUID id) {
        Optional<Linkage> linkage = linkageService.findById(id);
        if (linkage.isPresent()) {
            LinkageResponse response = linkageMapper.entityToResponse(linkage.get());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        return new ResponseEntity<>(new LinkageResponse(), HttpStatus.NOT_FOUND);
    }

    @GetMapping
    @ApiOperation(value = "All ovc linkage records")
    public ResponseEntity<List<LinkageResponse>> list() {
        List<LinkageResponse> responseList = linkageMapper.entityListToResponseList(linkageService.findAll());

        return new ResponseEntity<>(responseList, HttpStatus.OK);
    }

    @PostMapping("/export")
    @ApiOperation(value = "Export OVC Linkage records to a file")
    public ResponseEntity<String> exportFile() {
        linkageService.exportRecordToJson();

        return ResponseEntity.ok().body("Data exported successfully");
    }

    @PostMapping("/import")
    @ApiOperation(value = "Import an existing linkage from a file")
    public ResponseEntity<String> importFile(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw  new IllegalArgumentException("File cannot be empty");
        }

        linkageService.importJsonFromFile(file);

        return ResponseEntity.ok().body("Data imported successfully");
    }

    @GetMapping("/available-files")
    @ApiOperation(value = "Get available files")
    public ResponseEntity<Set<String>> availableFile() throws IOException {
        return new ResponseEntity<>(linkageService.listFilesUsingDirectoryStream(), HttpStatus.OK);
    }

    @GetMapping("/download/{fileName}")
    @ApiOperation(value = "Download file")
    public void downloadFile(@PathVariable String fileName, HttpServletResponse response) throws IOException {
        ByteArrayOutputStream byteArrayOutputStream = linkageService.downloadFile(fileName);
        response.setHeader(ConstantUtility.CONTENT_DISPOSITION,  ConstantUtility.ATTACHMENT_FILENAME + fileName);
        response.setHeader("Content-Type", "application/octet-stream");
        response.setHeader("Content-Length", Integer.toString(byteArrayOutputStream.size()));
        OutputStream outputStream = response.getOutputStream();
        outputStream.write(byteArrayOutputStream.toByteArray());
        outputStream.close();
        response.flushBuffer();
    }

}
