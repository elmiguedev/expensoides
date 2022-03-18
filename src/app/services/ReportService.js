import axios from "axios";

export class ReportService {
  constructor() {
  }

  static generateGenericExpenseReport(data) {
    axios({
      url: '/api/report/expenses/generic', //your url
      method: 'POST',
      data: data,
      responseType: 'blob', // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf'); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  }

}