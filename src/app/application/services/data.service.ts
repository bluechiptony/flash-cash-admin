import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor() {}

  transctions: any[] = [
    {
      reference: "7ef5d943-25bc-4e91-8e95-d5f8829e5e10",
      serviceCharge: "NGN 100.00",
      status: "success",
      customer: {
        emailAddress: "tony5egwu@gmail.com",
        fullName: "James Balamo",
        identifier: { name: "Phone Number", value: "08023343389" }
      },
      amount: "NGN 1,000.00",
      totalAmount: "NGN 1,100.00",
      merchant: { name: "Merchant Name", serviceName: "1000 Naira Airtime" },
      date: "Jun 22, 2019",
      time: "7:03:25 PM"
    },
    {
      reference: "7ef5d943-25bc-4e91-8e95-d5f8829e5e10",
      serviceCharge: "NGN 100.00",
      status: "success",
      customer: {
        emailAddress: "tony5egwu@gmail.com",
        fullName: "James Balamo",
        identifier: { name: "Phone Number", value: "08023343389" }
      },
      amount: "NGN 2,000.00",
      totalAmount: "NGN 2,100.00",
      merchant: { name: "Merchant Name", serviceName: "2000 Naira Airtime" },
      date: "Jun 22, 2019",
      time: "7:03:25 PM"
    }
  ];

  users: any[] = [
    {
      userCode: "23473247",
      firstName: "Jon",
      lastName: "Snow",
      emailAddress: "jon.snow@winterfell.com",
      phoneNumber: "080122323397",
      active: true
    },
    {
      userCode: "932849",
      firstName: "Cersei",
      lastName: "Lannister",
      emailAddress: "cersei@kingslanding.com",
      phoneNumber: "080122323397",
      active: false
    }
  ];
}
