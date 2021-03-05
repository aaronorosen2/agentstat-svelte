const graphTypeArr = ['Single Family', 'Condominium', 'Townhouse', 'Manufactured', 'Multi-family', 'Land', 'N/A'];
const graphPriceArr = ['$0 - 200K', '$200 - 400K', '$400 - 600K', '$600 - 800K', '$800K - 1M', '$1M+', 'N/A'];

function formatForMonth(data) {
    for(let v of data){
        let split = v.date.split("/");
        v.date = parseInt(split[0])+'/'+split[1];
    }
	return data;
}

function formatForYear(data) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    for( let v of  data){
        let split = v.date.split("/");
        let key = parseInt(split[0]) - 1;
        v.date = monthNames[key];
    }
	return data;
}

Date.prototype.addDays = function(days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function getFormattedDate(dateObj) {
    let date = ("0" + (dateObj.getDate()+1)).slice(-2);
	let month = ("0" + (dateObj.getMonth()+1)).slice(-2);
	let year = dateObj.getFullYear().toString().substr(-2);
	return month+'/'+date+'/'+year;
}

function getDates({start_date, end_date}) {
    let dateArray = new Array();
    let currentDate = start_date;
    while (currentDate <= end_date) {
        dateArray.push(getFormattedDate(currentDate));
		currentDate = currentDate.addDays(1);
	}
    return dateArray;
}

function getMonths() {
    let date = new Date();
    let months = [];
    let monthCount = date.getUTCMonth()+1;
    for (let i = 0; i < monthCount; i++) {
        let month = ("0" + (date.getUTCMonth()+1)).slice(-2);
        let year = date.getUTCFullYear().toString().substr(-2);
        months.push(month+'/'+year);
        date.setMonth(date.getMonth() - 1)
    }
    return months.reverse();
}


export default {
    getStartEndDate(type) {
        let date = new Date();
        let day = date.getDate();
        let month = ("0" + (date.getMonth()+1)).slice(-2);
        let year = date.getFullYear();
        let endDate = year+'-'+month+'-'+day;
        let startDate
    
        if (type == 'this') {
             startDate = year+'-'+month+'-01';
        } else if (type == 'last') {
             date = new Date(date.getFullYear(),date.getMonth(),0);
             day = date.getDate();
             month = ("0" + (date.getMonth()+1)).slice(-2);
             year = date.getFullYear();
             startDate = year+'-'+month+'-01';
             endDate = year+'-'+month+'-'+day;
        } else {
             let last = new Date(date.getTime() - (type * 24 * 60 * 60 * 1000));
             day =last.getDate();
             month = ("0" + (last.getMonth()+1)).slice(-2);
             year=last.getFullYear();
             startDate = year+'-'+month+'-'+day;
        }
    
        return {'start_date': startDate, 'end_date': endDate};
    },

    fillMissingDates(data, filter_date) {
       let range
       if (filter_date == '365') {
           range = getMonths();
       } else {
           let dates = this.getStartEndDate(filter_date)
           let start_date = new Date(dates.start_date)
           let end_date = new Date(dates.end_date)
           range = getDates({start_date, end_date});
       }
       let res = [];
       for (let i = 0; i < range.length; i++) {
           let date = range[i];
           let index = data.findIndex(x => x.date == date);
           let obj
           if (index === -1) {
               obj = {"date":date,"date_count":0};
           } else {
               obj = data[index];
           }
           res.push(obj);
       }
       if (filter_date == '29' || filter_date == 'this' || filter_date == 'last') {
           res = formatForMonth(res);
       } else if (filter_date == '365') {
           res = formatForYear(res);
       }
       return res;
   },
   
   fillMissingTypes(data) {
       let res = [];
       for (let i = 0; i < graphTypeArr.length; i++) {
           let type = graphTypeArr[i];
           let index = data.findIndex(x => x.q_type == type);
           let obj
           if (index === -1) {
               obj = {"q_type":type,"type_count":0};
           } else {
               obj = data[index];
           }
           res.push(obj);
       }
       return res;
   },
   
   fillMissingPrices(data) {
       let res = [];
       for (let i = 0; i < graphPriceArr.length; i++) {
           let price = graphPriceArr[i];
           let index = data.findIndex(x => x.q_price_range == price);
           let obj
           if (index === -1) {
               obj = {"q_price_range":price,"price_count":0};
           } else {
               obj = data[index];
           }
           res.push(obj);
       }
       return res;
   },

   setFilter(val){
       localStorage.setItem('report/filter',val)
   },
   getFilter(){
       return localStorage.getItem('report/filter')||'6'
   }

}
