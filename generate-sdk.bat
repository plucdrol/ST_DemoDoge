REM see https://github.com/SpaceTradersAPI/api-docs
REM download the input file into a new 'local/' directory then run the script
REM the generated folder in 'local/' can be copied into the project; see its README for next steps
docker run --rm -v %cd%/local:/local openapitools/openapi-generator-cli generate -i /local/api-docs/reference/SpaceTraders.json -o /local/spacetraders-fetch-sdk -g typescript-fetch --additional-properties=npmName="spacetraders-sdk" --additional-properties=npmVersion="9.5.1" --additional-properties=supportsES6=true --additional-properties=withSeparateModelsAndApi=true --additional-properties=modelPackage="models" --additional-properties=apiPackage="api"

