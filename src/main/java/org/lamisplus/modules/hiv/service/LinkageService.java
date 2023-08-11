package org.lamisplus.modules.hiv.service;

import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.hiv.domain.dto.LinkageRequest;
import org.lamisplus.modules.hiv.domain.entity.Linkage;
import org.lamisplus.modules.hiv.repositories.LinkageRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;


@Slf4j
@Service
@RequiredArgsConstructor
public class LinkageService {
    private final LinkageRepository repository;
    private static final String ENTITY_NAME = "ovc_linkage";
    private static final String FILE_TYPE = "JSON";
    SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmm");
    private static final String LINKAGE_EXPORT = System.getProperty("user.dir") + File.separator + "export" + File.separator + "linkage";
    private static final String LINKAGE_IMPORT = System.getProperty("user.dir") + File.separator + "import" + File.separator + "linkage";

    public List<Linkage> save(List<Linkage> entities) {
        List<Linkage> updateLinkage = new ArrayList<>();
        for (Linkage entity : entities) {
            Optional<Linkage> optionalLinkage = repository.findByOvcUniqueId(entity.getOvcUniqueId());
            if (optionalLinkage.isPresent()) {
                Linkage update = optionalLinkage.get();
                entity.setId(update.getId());
                entity.setHouseholdUniqueId(update.getHouseholdUniqueId());
            } else {
                entity.setId(UUID.randomUUID());
            }
            updateLinkage.add(entity);
        }
        entities.clear();

        return repository.saveAll(updateLinkage);
    }

    public Optional<Linkage> findById(UUID id) {
        return repository.findById(id);
    }

    public List<Linkage> findAll() {
        return repository.findAll().stream().sorted(Comparator.comparing(Linkage::getDateModified).reversed()).collect(Collectors.toList());
    }

    public Linkage update(Linkage entity, UUID id) {
        entity.setId(id);

        return repository.save(entity);
    }

    public List<Linkage> findByDatimCode(String datimCode) {
        return repository.findByDatimCode(datimCode);
    }

    public Optional<Linkage> findByArtNumber(String artNumber) {
        return repository.findByArtNumber(artNumber);
    }

    public Optional<Linkage> findByOvcUniqueId(String ovcUniqueId) {
        return repository.findByOvcUniqueId(ovcUniqueId);
    }

    public List<Linkage> findByHouseholdUniqueId(String householdUniqueId) {
        return repository.findByHouseholdUniqueId(householdUniqueId);
    }

    public String exportRecordToJson() {
        String filePath = "None";
        try {
            //write your query to retrieve vc from database
            List<LinkageRequest> linkageList = getAllPositiveNonArt();
            if (!linkageList.isEmpty()) {
                filePath = LINKAGE_EXPORT + File.Separator + "ovc_linkage_" + df.format(new java.util.Date()) + ".json";
                String json = objectToJson(linkageList);
                writeObjectToFile(json, filePath);
                File file = new File(filePath);
                if (file.exists()) {
                    FileData fileData = new FileData(file.getName(), FILE_TYPE);
                }
            } else {
                filePath = "None";
                log.info("No record found");
            }
        } catch (IOException exception) {
            log.debug(exception.getMessage());
        }

        return filePath;
    }

    public boolean importJsonFromFile(MultipartFile file) {
        boolean result = false;
        String jsonObjectFilePath = LINKAGE_IMPORT + File.Separator + file.getOriginalFilename();
        file.transferTo(new File(jsonObjectFilePath));
        List<Linkage> linkageList = jsonFileToObjectList(jsonObjectFilePath);
        linkageList = save(linkageList);
        if (!linkageList.isEmpty()) {
            result = true;
        }

        return result;
    }

    @PostConstruct
    public void init() {
        createDirectoryIfNotExists(LINKAGE_EXPORT);
        createDirectoryIfNotExists(LINKAGE_IMPORT);
    }

    public Set<String> listFilesUsingDirectoryStream() throws IOException {
        final Set<String> fileList = new HashSet<>();
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(Paths.get(LINKAGE_EXPORT))) {
            for (Path path : stream) {
                if (!Files.isDirectory(path)) {
                    fileList.add(path.getFileName().toString());
                }
            }
        }

        return fileList;
    }

    @SneakyThrows
    public ByteArrayOutputStream downloadFile(String fileName) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        final Optional<String> fileToDownload = listFilesUsingDirectoryStream().stream()
                .filter(f -> f.equals(fileName))
                .findFirst();
        fileToDownload.ifPresent(s -> {
            try (InputStream is = Files.newInputStream(Paths.get(directory + s))) {
                IOUtils.copy(is, byteArrayOutputStream);
            } catch (IOException exception) {
                log.debug("An error occurred while downloading file: {}", exception.getMessage());
            }
        });

        return byteArrayOutputStream;
    }

    private LinkageNotFoundException throwException(String value) {
        throw new LinkageNotFoundException("Linkage Not Found with ID: " + value);
    }

    private String objectToJson(T object) {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        objectMapper.configure(DeserializationFeature.FAIL_ON_NULL_FOR_PRIMITIVES, false);
        objectMapper.configure(DeserializationFeature.FAIL_ON_NUMBERS_FOR_ENUMS, false);
        try {
            if (object != null) {
                return mapper.writeValueAsString(object);
            }
            return null;
        } catch (IOException e) {
            log.error("Error writing object to JSON");
            return null;
        }
    }

    private void writeObjectToFile(String jsonObject, String jsonFilePath) throws IOException {
        try(FileWriter writer = new FileWriter(jsonFilePath)){
            writer.write(jsonObject);
        } catch (IOException exception) {
            log.debug("Exception: {}", exception.getMessage());
        }

    }

    private List<Linkage> jsonFileToObjectList(String jsonFilePath){
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        objectMapper.configure(DeserializationFeature.FAIL_ON_NULL_FOR_PRIMITIVES, false);
        objectMapper.configure(DeserializationFeature.FAIL_ON_NUMBERS_FOR_ENUMS, false);

        List<T> objectList = new ArrayList<>();
        try {
            if (jsonFilePath != null) {
                File file = new File(jsonFilePath);
                if (file.exists()) {
                    CollectionType javaType = objectMapper.getTypeFactory()
                            .constructCollectionType(List.class, Linkage.class);
                    objectList = objectMapper.readValue(file, javaType);
                } else {
                    log.error("File " + jsonFilePath + " does not exist");
                    return new ArrayList<>();
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return objectList;
    }

    private void createDirectoryIfNotExists(String directoryPath) {
        File directory = new File(directoryPath);
        if (!directory.exists()) {
            if (directory.mkdirs()) {
                log.info("Directory created: " + directory.getAbsolutePath());
            } else {
                log.error("Failed to create the directory: " + directory.getAbsolutePath());
            }
        }
    }

}