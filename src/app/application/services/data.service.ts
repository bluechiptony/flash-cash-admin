import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor() {}

  accountType: string[] = ["ADMINISTRATOR", "SALES", "REVIEW", "APPROVE"];

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

  banks: any[] = [
    {
      name: "Access Bank",
      slug: "access-bank",
      code: "044",
      longcode: "044150149"
    },
    {
      name: "Citibank Nigeria",
      slug: "citibank-nigeria",
      code: "023",
      longcode: "023150005"
    },
    {
      name: "Diamond Bank",
      slug: "diamond-bank",
      code: "063",
      longcode: "063150162"
    },
    {
      name: "Ecobank Nigeria",
      slug: "ecobank-nigeria",
      code: "050",
      longcode: "050150010"
    },
    {
      name: "Enterprise Bank",
      slug: "enterprise-bank",
      code: "084",
      longcode: "084150015"
    },
    {
      name: "Fidelity Bank",
      slug: "fidelity-bank",
      code: "070",
      longcode: "070150003"
    },
    {
      name: "First Bank of Nigeria",
      slug: "first-bank-of-nigeria",
      code: "011",
      longcode: "011151003"
    },
    {
      name: "First City Monument Bank",
      slug: "first-city-monument-bank",
      code: "214",
      longcode: "214150018"
    },
    {
      name: "Guaranty Trust Bank",
      slug: "guaranty-trust-bank",
      code: "058",
      longcode: "058152036"
    },
    {
      name: "Heritage Bank",
      slug: "heritage-bank",
      code: "030",
      longcode: "030159992"
    },
    {
      name: "Keystone Bank",
      slug: "keystone-bank",
      code: "082",
      longcode: "082150017"
    },
    {
      name: "MainStreet Bank",
      slug: "mainstreet-bank",
      code: "014",
      longcode: "014150331"
    },
    {
      name: "Skye Bank",
      slug: "skye-bank",
      code: "076",
      longcode: "076151006"
    },
    {
      name: "Stanbic IBTC Bank",
      slug: "stanbic-ibtc-bank",
      code: "221",
      longcode: "221159522"
    },
    {
      name: "Standard Chartered Bank",
      slug: "standard-chartered-bank",
      code: "068",
      longcode: "068150015"
    },
    {
      name: "Sterling Bank",
      slug: "sterling-bank",
      code: "232",
      longcode: "232150016"
    },
    {
      name: "Union Bank of Nigeria",
      slug: "union-bank-of-nigeria",
      code: "032",
      longcode: "032080474"
    },
    {
      name: "United Bank For Africa",
      slug: "united-bank-for-africa",
      code: "033",
      longcode: "033153513"
    },
    {
      name: "Unity Bank",
      slug: "unity-bank",
      code: "215",
      longcode: "215154097"
    },
    {
      name: "Wema Bank",
      slug: "wema-bank",
      code: "035",
      longcode: "035150103"
    },
    {
      name: "Zenith Bank",
      slug: "zenith-bank",
      code: "057",
      longcode: "057150013"
    }
  ];
}
