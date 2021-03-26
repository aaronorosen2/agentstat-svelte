

function nth(d) {
	if (d > 3 && d < 21) return 'th';
	switch (d % 10) {
		case 1:  return "st";
		case 2:  return "nd";
		case 3:  return "rd";
		default: return "th";
	}
}

function formatAMPM(timedate) {
	const date = new Date(timedate);
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12;
	minutes = minutes < 10 ? '0'+minutes : minutes;
	let strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime;
}

export default {
    niceDate(timedate, withyear=true) {
        const fortnightAway = new Date(timedate);
        const date = fortnightAway.getDate();
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][fortnightAway.getMonth()];
        let cdate
        if (withyear) {
            cdate = `${month} ${date}${nth(date)}, ${fortnightAway.getFullYear()}`;
        } else {
            cdate = `${month} ${date}${nth(date)}`;
        }
        return cdate;
    },
    niceDateTime(timedate) {
        return  `${this.niceDate(timedate)} at ${formatAMPM(timedate)}`;
    },
	currencyFormat(num) {
        if(!num) return '$0'
        return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
}