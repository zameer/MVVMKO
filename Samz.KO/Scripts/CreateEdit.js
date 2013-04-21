﻿var url = window.location.pathname;
var profileId = url.substring(url.lastIndexOf('/') + 1);

var DummyProfile = [
    {
        "ProfileId": 1,
        "FirstName": "Ahamed",
        "LastName": "Sameer",
        "Email": "ahamedsmr@yahoo.com"
    },
    {
        "ProfileId": 2,
        "FirstName": "Ayyash",
        "LastName": "Ahamed",
        "Email": "my@son.com"
    }
];

var PhoneTypeData = [
    {
        "PhoneTypeId": 1,
        "Name": "Work Phone"
    },
    {
        "PhoneTypeId": 2,
        "Name": "Personal Phone"
    }
];

var PhoneDTO = [
    {
        "PhoneId":1,
        "PhoneTypeId": 1,
        "ProfileId":1,
        "Number": "077-660-8735"
    },
    {
        "PhoneId": 2,
        "PhoneTypeId": 2,
        "ProfileId": 1,
        "Number": "077-660-8735"
    }
];

var AddressTypeData = [
    {
        "AddressTypeId": 1,
        "Name": "Shipping Address"
    },
    {
        "AddressTypeId": 2,
        "Name": "Billing Address"
    }
];

var AddressDTO = [
    {
        "AddressId": 1,
        "AddressTypeId": 1,
        "ProfileId": 1,
        "AddressLine1": "10000 Richmond Avenue",
        "AddressLine2": "Apt # 1000",
        "Country": "USA",
        "State": "Texas",
        "City": "Houston",
        "ZipCode": "70000"
    },
    {
        "AddressId": 2,
        "AddressTypeId": 2,
        "ProfileId": 1,
        "AddressLine1": "20000 Highway 6",
        "AddressLine2": "Suite # 2000",
        "Country": "USA",
        "State": "Texas",
        "City": "Houston",
        "ZipCode": "80000"
    }
];


var Profile = function (profile) {
    var self = this;
    self.ProfileId = ko.observable(profile ? profile.ProfileId : 0).extend({ required: true });
    self.FirstName = ko.observable(profile ? profile.FirstName : '').extend({ required: true, maxLength: 50 });
    self.LastName = ko.observable(profile ? profile.LastName : '').extend({ required: true, maxLength: 50 });
    self.Email = ko.observable(profile ? profile.Email : '').extend({ required: true, maxLength: 50, email: true });
    self.PhoneDTO = ko.observableArray(profile ? profile.PhoneDTO : []);
    self.AddressDTO = ko.observableArray(profile ? profile.AddressDTO : []);
};

var PhoneLine = function (phone) {
    var self = this;
    self.PhoneId = ko.observable(phone ? phone.PhoneId : 0);
    self.PhoneTypeId = ko.observable(phone ? phone.PhoneTypeId : undefined).extend({ required: true });
    self.Number = ko.observable(phone ? phone.Number : '').extend({ required: true });
};

var AddressLine = function (address) {
    var self = this;
    self.AddressId = ko.observable(address ? address.AddressId : 0);
    self.AddressTypeId = ko.observable(address ? address.AddressTypeId : undefined).extend({ required: true });
    self.AddressLine1 = ko.observable(address ? address.AddressLine1 : '').extend({ required: true, maxLength: 100 });
    self.AddressLine2 = ko.observable(address ? address.AddressLine2 : '').extend({ required: true, maxLength: 100 });
    self.Country = ko.observable(address ? address.Country : '').extend({ required: true, maxLength: 50 });
    self.State = ko.observable(address ? address.State : '').extend({ required: true, maxLength: 50 });
    self.City = ko.observable(address ? address.City : '').extend({ required: true, maxLength: 50 });
    self.ZipCode = ko.observable(address ? address.ZipCode : '').extend({ required: true, maxLength: 15 });
};


var ProfileCollection = function () {
    var self = this;

    //if ProfileId is 0, It means Create new Profile
    if (profileId == 0) {
        self.profile = ko.observable(new Profile());
        self.phoneNumbers = ko.observableArray([new PhoneLine()]);
        self.addresses = ko.observableArray([new AddressLine()]);
    }
    else {
        //For Profile information
        var currentProfile = $.grep(DummyProfile, function (e) { return e.ProfileId == profileId; });
        self.profile = ko.observable(new Profile(currentProfile[0]));
        //For Phone number
        var currentProfilePhone = $.grep(PhoneDTO, function (e) { return e.ProfileId == profileId; });
        self.phoneNumbers = ko.observableArray(ko.utils.arrayMap(currentProfilePhone, function (phone) {
            return phone;
        }));
        //For Address
        var currentProfileAddress = $.grep(AddressDTO, function (e) { return e.ProfileId == profileId; });
        self.addresses = ko.observableArray(ko.utils.arrayMap(currentProfileAddress, function (address) {
            return address;
        }));
    }

    self.addPhone = function () {
        self.phoneNumbers.push(new PhoneLine())
    };

    self.removePhone = function (phone) { self.phoneNumbers.remove(phone) };

    self.addAddress = function () {
        self.addresses.push(new AddressLine())
    };

    self.removeAddress = function (address) { self.addresses.remove(address) };

    self.backToProfileList = function () { window.location.href = '/contact'; };

    self.profileErrors = ko.validation.group(self.profile());
    self.phoneErrors = ko.validation.group(self.phoneNumbers(), { deep: true });
    self.addressErrors = ko.validation.group(self.addresses(), { deep: true });

    self.saveProfile = function () {

        var isValid = true;

        if (self.profileErrors().length != 0) {
            self.profileErrors.showAllMessages();
            isValid = false;
        }

        if (self.phoneErrors().length != 0) {
            self.phoneErrors.showAllMessages();
            isValid = false;
        }

        if (self.addressErrors().length != 0) {
            self.addressErrors.showAllMessages();
            isValid = false;
        }

        if (isValid) {
            self.profile().AddressDTO = self.addresses;
            self.profile().PhoneDTO = self.phoneNumbers;
            alert("Date to save is : " + JSON.stringify(ko.toJS(self.profile())));
        }
    };
};

ko.applyBindings(new ProfileCollection());