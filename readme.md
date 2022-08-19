# Immutable Case Study

## Installation

Use NPM to set up a virtual machine

```bash
npm start
```

Otherwise you can find the case study here: [Immutable case study](http://henrydoes.com/immutable-usecase.html) 

## Technologies

- For front end I have used HTML,CSS,JS and react framework.
- I am also using the npm canvas package 'canvasjs-react-charts' for drawing the charts

## Notes

- For Immustascan API I am using static dates from 18-19 august 2022.

- As Cryproslam lets me find the top100 only I am doing the same for immutable using page_size=100

## Challengues

- Took me some time to find out the right API to use for ImmutableX https://docs.x.immutable.com/reference#/operations/listOrders At first I thought it was Trade API but the sell number was too big. I find out later than orders API tells you the decimal place to convert the quantity into a decimal number.

- I am not familiar with the wording used in the pdf document, I tried to find the suitable data from the APIs based on my own knowledge. i.e. top 10 leaderboard vs top 10 chains. I couldn't find chains or leaderboards in any website, is it referring to top collections? 

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)