package wpz.project.ebook.minio;

import io.minio.BucketExistsArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MinioConfig {

    @Value("${minio.url}")
    private String minioUrl;

    @Value("${minio.accessKey}")
    private String minioAccessKey;

    @Value("${minio.secretKey}")
    private String minioSecretKey;

    @Value("${minio.bucketName}")
    private String bucketName;

    @Bean
    public MinioClient minioClient() {
        MinioClient minioClient = MinioClient.builder()
                .endpoint(minioUrl)
                .credentials(minioAccessKey, minioSecretKey)
                .build();

        try {
            BucketExistsArgs bucketExistsArgs = BucketExistsArgs.builder()
                    .bucket(bucketName)
                    .build();
            boolean isBucketExists = minioClient.bucketExists(bucketExistsArgs);
            if (!isBucketExists) {
                MakeBucketArgs makeBucketArgs = MakeBucketArgs.builder()
                        .bucket(bucketName)
                        .build();
                minioClient.makeBucket(makeBucketArgs);
                System.out.println("Bucket został utworzony pomyślnie.");
            } else {
                System.out.println("Bucket już istnieje.");
            }
        } catch (Exception e) {
            System.out.println("Błąd: " + e.getMessage());
        }

        return minioClient;
    }
}