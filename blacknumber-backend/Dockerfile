# Render: set Root Directory = blacknumber-backend, Runtime = Docker
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app
COPY pom.xml mvnw ./
COPY .mvn .mvn
COPY src ./src
RUN chmod +x mvnw && ./mvnw -q -DskipTests clean package

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/blacknumber-backend-1.0.0.jar app.jar
EXPOSE 8080
CMD ["sh", "-c", "java -jar app.jar"]
