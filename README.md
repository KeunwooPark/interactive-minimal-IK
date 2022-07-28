# interacive minmal IK

This is a tool to find MANO pose parameters for specific hand poses. The IK engine is forked from [CalciferZh/Minimal-IK
](https://github.com/CalciferZh/Minimal-IK).

![there are two text input boxes on the top labeled as API server address and the number of pose PCA. Next, there are two buttons to load default pose and find mano pose parameters. On its bottom, there is a text output for MANO pose parameters. There is a 3D hand pose editor on the center of the page. On the bottom of the page, there is a button to export the object file.](interactive-minimal-ik.png "interactive minimal IK")

[quick video tutorial](https://youtu.be/EojVdM7cloE)

## how to run

1. prepare Mano model

Download the MANO model from the [official website](https://mano.is.tue.mpg.de/) and put the MANO model under `api/mano`. Or, you can put the model whereever you want to and change the `OFFICIAL_MANO_PATH` in `api/config.py`.

2. install requirements for the API server

```sh
$ pip install -r api/requirements.txt
```

3. run the API server

```sh
$ ./api/run_api/server.sh
```

4. install packages for the client server
```sh
$ cd client
$ npm install
```

5. run the client server (nextjs)

```sh
# you will be in the client directory
$ npm run dev
```

6. access the client server.
