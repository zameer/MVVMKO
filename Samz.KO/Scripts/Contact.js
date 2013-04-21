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

var ProfilesViewModel = function () {
    var self = this;
    var refresh = function () {
        self.Profiles(DummyProfile);
    };

    // Public data properties
    self.Profiles = ko.observableArray([]);

    // Public operations
    self.createProfile = function () {
        window.location.href = '/Contact/CreateEdit/0';
    };

    self.editProfile = function (profile) {
        window.location.href = '/Contact/CreateEdit/' + profile.ProfileId;
    };

    self.removeProfile = function (profile) {
        if (confirm("Are you sure you want to delete this profile?")) {
            self.Profiles.remove(profile);
        }
    };
    refresh();
};
ko.applyBindings(new ProfilesViewModel());