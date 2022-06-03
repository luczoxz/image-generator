# Images generator

A simple image api 4-fun project in typescript.

## Installation
To install, you have to compile the typescript files. You can do that by using:
```sh
tsc
```
Then, you can run the script anytime using:
```sh
node . --port <port>
```
You don't have to specify the port, it defaults to 3000.

## Usage

### Adding images
To add images, put them in the `./images` directory. Each image has to be in the following formats: `jpg, jpeg, png`. That's it.

### Possible requests

#### `GET /api/random`
Generates a random image. No parameters required. Returns an image ID.

#### `GET /images?id=<id>`
Returns the image that has the specified ID. The only required parameter is `id`. For example: `GET /images?id=1509`