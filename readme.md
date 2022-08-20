# Immutable Case Study

## Installation

Use NPM to set up a virtual machine

```bash
npm start
```

Otherwise you can find the case study here: [Immutable case study](http://henrydoes.com/immutable-casestudy.html) 

## Technologies

- For front end I have used HTML,CSS,JS and React framework/hooks.
- I am using the npm canvas package 'canvasjs-react-charts' for drawing the charts
- I am using Firebase database real time integration to get static data for the cryptoslam top 10. An example of the database I am using in firebase is db.json in my files

## Notes

- Comparison tables are empty by default, click on the checkboxes to see data

- As Cryproslam lets me find the top100 only I am doing the same for immutable using page_size=100 in the API trade call.

- The section 1 and 2 are partially done and I have set them up as react component pages, you can select them from the header.

- I have prioritize time over quality of code. I could use code refactoring for some sections of my code but I had to prioritize trying to finish the tasks.

- I spent approximately 9 hrs developing this exercise.

- I have hidden firebase config data in .env 

## Challengues

- I am not sure I have used the right APIs due to I am not familiar with the cryptocurrency wording. It was difficult to match what it was asked in the PDF vs what is available in the APIs documentation online and the websites. 

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)