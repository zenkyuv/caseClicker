export const getSteamData = fetch("https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA6Q1NL4kmrAlOA0_FVPCi2t_fUkRxNztUoreaOBM27OXJYzRD4si82tOIxq_3N-yDl2hXuZQhibuUpN2jjQPtqRc5Z2zxd9DDclRqaArW_wWggbC4Uzmy7rk", {
		method: "GET",
		headers: {
			'Content-Type': 'application/json',
			
		}
	}).then(data => data).then(imageBlob => {
      // Then create a local URL for that image and print it
      // const imageObjectURL = URL.createObjectURL(imageBlob);
		// const imageObjectURL = Buffer.from(await imageBlob.arrayBuffer())
    //   console.log(imageObjectURL);
		// imageBlob.body.pipe(fs.createWriteStream('./img/img.png'))
  })