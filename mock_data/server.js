/**
 * Created by smallg on 8/26/14.
 */
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
var server = http.createServer(app);
//mongodb config
var mongo = require("mongodb");
var host = "localhost";
var port = mongo.Connection.DEFAULT_PORT;
var server = new mongo.Server(host, port, {auto_reconnect: true});
var db = new mongo.Db('node-mongo-examples', server, {safe: true});

app.use(bodyParser.json());
app.use(function (request, response, next) {
    console.log(request.url);

    if (request.get('Origin')) {
        response.set(
            {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',
                'Access-Control-Allow-Headers': 'accept, origin, content-type',
                'Access-Control-Max-Age': 3600
            }
        );
    }
    if (request.method == 'OPTIONS') {
        response.status(200);
    } else {
        next();
    }
});

app.post('/system-console-api/j_spring_security_check', function (request, response) {
    if (request.body.j_username == 'admin' && request.body.j_password == 'admin') {
        response.send(200);
    } else {
        response.send(400);
    }
});

app.get('/system-console-api/max-applicatie-onbruik', function (request, response) {
    response.json(200, {value: 600});
});
var configurationResult = [
    {id: "1", name: "configuration1", description: "test1 test1test1test1test1test1 test1test1test1", createDate: "2012-9-1", parameterValues: [], active: true, locked: false},
    {id: "2", name: "configuration2", description: "test2 test2 test2 test2 test2 test2 test2", createDate: "2012-9-13", parameterValues: [], active: false, locked: false},
    {id: "3", name: "configuration3", description: "test3", createDate: "2012-9-12", parameterValues: [], active: false, locked: false},
    {id: "4", name: "configuration4", description: "test4", createDate: "2012-9-14", parameterValues: [], active: false, locked: true},
    {id: "5", name: "configuration5", description: "test5", createDate: "2012-9-15", parameterValues: [], active: false, locked: false},
    {id: "6", name: "configuration6", description: "test6", createDate: "2012-9-16", parameterValues: [], active: false, locked: true},
    {id: "7", name: "configuration7", description: "test7 test7 test7 test7 test7 test7", createDate: "2012-9-12", parameterValues: [], active: false, locked: false},
    {id: "8", name: "configuration8", description: "test8", createDate: "2012-9-11", parameterValues: [], active: false, locked: false},
    {id: "9", name: "configuration9", description: "test9", createDate: "2012-9-16", parameterValues: [], active: false, locked: true},
    {id: "10", name: "configuration10", description: "test10", createDate: "2012-9-18", parameterValues: [], active: false, locked: false},
    {id: "11", name: "configuration11", description: "test11", createDate: "2012-9-17", parameterValues: [], active: false, locked: false},
    {id: "12", name: "configuration12", description: "test12", createDate: "2012-9-16", parameterValues: [], active: false, locked: false}
];
app.get('/system-console-api/configuration', function (request, response) {
    response.json(200, configurationResult);
});

app.get('/system-console-api/configuration/:id', function (request, response) {
    var configurationId = request.params.id;
    var configuration;
    for (var i = 0; i < configurationResult.length; i++) {
        if (configurationId == configurationResult[i].id) {
            configuration = configurationResult[i];
        }
    }
    response.json(200, configuration);
});

app.get('/system-console-api/configuration/copy/:id', function (request, response) {
    response.send(200);
});

app.get('/system-console-api/configuration/validate/:id', function (request, response) {
    var validateResult = [
        {organizationName: "org1", applicationName: "app1", type: "info", defaultMessage: "test info message"},
        {organizationName: "org1", applicationName: "app1", type: "warning", defaultMessage: "test warning message"},
        {organizationName: "org1", applicationName: "app1", type: "error", defaultMessage: "test error message"}
    ];
    //delay response
    setInterval(function () {
        response.json(200, validateResult)
    }, 2000);
});

app.get('/system-console-api/configuration/:id/global-parameters', function (request, response) {
    console.log("configuration id: " + request.params.id);
    var params = [
        {id: 1, group: "applicatie", name: "applicatie-max-sessie-onbruik", description: "applicatie-max-sessie-onbruik", type: "number", mandatory: true, value: 300},
        {id: 2, group: "applicatie", name: "applicatie-max-sleutel-duur", description: "applicatie-max-sleutel-duur", type: "number", mandatory: true, value: 300},
        {id: 3, group: "gbz", name: "gbz-bericht-id-bewaartijd", description: "gbz-bericht-id-bewaartijd", type: "number", mandatory: true, value: 300},
        {id: 4, group: "gbz", name: "gbz-bevestig-time-out", description: "gbz-bevestig-time-out", type: "number", mandatory: true, value: 300},
        {id: 5, group: "gbz", name: "gbz-bevestigbericht-bewaartijd", description: "gbz-bevestigbericht-bewaartijd", type: "number", mandatory: true, value: 300},
        {id: 6, group: "gbz", name: "gbz-opdracht-retry", description: "gbz-opdracht-retry", type: "boolean", mandatory: true, value: true},
        {id: 7, group: "gbz", name: "gbz-oplever-time-out", description: "gbz-oplever-time-out", type: "number", mandatory: true, value: 300},
        {id: 8, group: "gbz", name: "gbz-opleverbericht-bewaartijd", description: "gbz-opleverbericht-bewaartijd", type: "number", mandatory: true, value: 300},
        {id: 9, group: "gbz", name: "gbz-opvraag-retry", description: "gbz-opvraag-retry", type: "number", mandatory: true, value: 300},
        {id: 10, group: "gbz", name: "gbz-opvraag-time-out", description: "gbz-opvraag-time-out", type: "boolean", mandatory: true, value: false},
        {id: 11, group: "gebruiker", name: "gebruiker-max-applicatie-onbruik", description: "gebruiker-max-applicatie-onbruik", type: "number", mandatory: true, value: 300},
        {id: 12, group: "gebruiker", name: "gebruiker-max-kaart-uit", description: "gebruiker-max-kaart-uit", type: "string", mandatory: true, value: 'xxx'},
        {id: 13, group: "gebruiker", name: "gebruiker-max-sessie-duur", description: "gebruiker-max-sessie-duur", type: "number", mandatory: true, value: 300},
        {id: 14, group: "gebruiker", name: "gebruiker-max-sessie-onbruik", description: "gebruiker-max-sessie-onbruik", type: "number", mandatory: true, value: 300},
        {id: 15, group: "gebruiker", name: "gebruiker-max-sleutel-duur", description: "gebruiker-max-sleutel-duur", type: "number", mandatory: true, value: 300},
        {id: 16, group: "token authenticatie", name: "max-geldigheidsduur-token", description: "max-geldigheidsduur-token", type: "string", mandatory: true, value: 'aaa'},
        {id: 17, group: "systeem", name: "systeem-max-sessie-duur", description: "systeem-max-sessie-duur", type: "number", mandatory: true, value: 300},
        {id: 18, group: "systeem", name: "systeem-max-sessie-onbruik", description: "systeem-max-sessie-onbruik", type: "number", mandatory: true, value: 300},
        {id: 19, group: "systeem", name: "systeem-max-sleutel-duur", description: "systeem-max-sleutel-duur", type: "number", mandatory: true, value: 300}
    ];
    response.json(200, params);
});

app.get('/system-console-api/system/:id/system-parameters', function (request, response) {
    console.log("configuration id: " + request.params.id);
    var params = [
        {id: 1, group: "applicatie", name: "applicatie-max-sessie-onbruik", description: "applicatie-max-sessie-onbruik", type: "number", mandatory: true, value: 300},
        {id: 2, group: "applicatie", name: "applicatie-max-sleutel-duur", description: "applicatie-max-sleutel-duur", type: "number", mandatory: true, value: 300},
        {id: 3, group: "gbz", name: "gbz-bericht-id-bewaartijd", description: "gbz-bericht-id-bewaartijd", type: "number", mandatory: true, value: 300},
        {id: 4, group: "gbz", name: "gbz-bevestig-time-out", description: "gbz-bevestig-time-out", type: "number", mandatory: true, value: 300},
        {id: 5, group: "gbz", name: "gbz-bevestigbericht-bewaartijd", description: "gbz-bevestigbericht-bewaartijd", type: "number", mandatory: true, value: 300},
        {id: 6, group: "gbz", name: "gbz-opdracht-retry", description: "gbz-opdracht-retry", type: "boolean", mandatory: true, value: true},
        {id: 7, group: "gbz", name: "gbz-oplever-time-out", description: "gbz-oplever-time-out", type: "number", mandatory: true, value: 300},
        {id: 8, group: "gbz", name: "gbz-opleverbericht-bewaartijd", description: "gbz-opleverbericht-bewaartijd", type: "number", mandatory: true, value: 300},
        {id: 9, group: "gbz", name: "gbz-opvraag-retry", description: "gbz-opvraag-retry", type: "number", mandatory: true, value: 300},
        {id: 10, group: "gbz", name: "gbz-opvraag-time-out", description: "gbz-opvraag-time-out", type: "boolean", mandatory: true, value: false},
        {id: 11, group: "gebruiker", name: "gebruiker-max-applicatie-onbruik", description: "gebruiker-max-applicatie-onbruik", type: "number", mandatory: true, value: 300},
        {id: 12, group: "gebruiker", name: "gebruiker-max-kaart-uit", description: "gebruiker-max-kaart-uit", type: "string", mandatory: true, value: 'xxx'},
        {id: 13, group: "gebruiker", name: "gebruiker-max-sessie-duur", description: "gebruiker-max-sessie-duur", type: "number", mandatory: true, value: 300},
        {id: 14, group: "gebruiker", name: "gebruiker-max-sessie-onbruik", description: "gebruiker-max-sessie-onbruik", type: "number", mandatory: true, value: 300},
        {id: 15, group: "gebruiker", name: "gebruiker-max-sleutel-duur", description: "gebruiker-max-sleutel-duur", type: "number", mandatory: true, value: 300},
        {id: 16, group: "token authenticatie", name: "max-geldigheidsduur-token", description: "max-geldigheidsduur-token", type: "string", mandatory: true, value: 'aaa'},
        {id: 17, group: "systeem", name: "systeem-max-sessie-duur", description: "systeem-max-sessie-duur", type: "number", mandatory: true, value: 300},
        {id: 18, group: "systeem", name: "systeem-max-sessie-onbruik", description: "systeem-max-sessie-onbruik", type: "number", mandatory: true, value: 300},
        {id: 19, group: "systeem", name: "systeem-max-sleutel-duur", description: "systeem-max-sleutel-duur", type: "number", mandatory: true, value: 300}
    ];
    response.json(200, params);
});

app.post('/system-console-api/configuration/global-parameters', function (request, response) {
    console.log(request.body);
    response.send(200);
});

app.post('/system-console-api/system/system-parameters', function (request, response) {
    console.log(request.body);
    response.send(200);
});

app.post('/system-console-api/configuration', function (request, response) {
    console.log(request.body);
    response.send(200);
});

app.get('/system-console-api/configuration/:id/national-switchpoint', function (request, response) {
    var result = [
        {ipAddress: "194.45.8.110", fullyQualifiedDomainName: "lsppto.csc-lsp.nl", root: "2.16.840.1.113883.2.4.6.6", extension: "3", displayName: "test national switch point", uri: "/", type: "test", issuerDomainName: "CN=Getronics CSP Organisatie CA - G2,O=Getronics Nederland BV,C=NL"},
        {ipAddress: "127.0.0.1", fullyQualifiedDomainName: "lsppto.csc-lsp.nl", root: "2.16.840.1.113883.2.4.6.6", extension: "1", displayName: "production national switch point", uri: "/", type: "production", issuerDomainName: "CN=Getronics PinkRoccade PKIoverheid CA - Overheid en Bedrijven,O=Getronics PinkRoccade Nederland B.V.,C=NL"}
    ];
    response.json(200, result);
});

app.post('/system-console-api/configuration/national-switchpoint', function (request, response) {
    console.log(request.body);
    response.send(200);
});

app.get('/system-console-api/system/:id', function (request, response) {
    var result = [
        {username: "a1", password: "a", displayName: "a1", ipAddress: "192.168.1.1", secondaryIpAddress: "127.0.0.1", fullyQualifiedDomainName: "demo236.demo.enovation.net", emailAddress: "test@test.com", telephone: "000123456", organizationName: "a", organizationalUnitName: "a", applications: [], activeCertificate: {}, certificates: [], active: true, id: "1", messageIdRoot: "2.16.528.1.1007.3.2", root: "2.16.840.1.113883.2.4.3.11.4", extension: "for-viewer", uziMembershipNumber: "90000380", locality: "CD", type: {}, gatewayServiceBean: {}},
        {username: "a2", password: "a", displayName: "a2", ipAddress: "192.168.1.1", secondaryIpAddress: "127.0.0.1", fullyQualifiedDomainName: "demo236.demo.enovation.net", emailAddress: "test@test.com", telephone: "000123456", organizationName: "a", organizationalUnitName: "a", applications: [], activeCertificate: {}, certificates: [], active: true, id: "2", messageIdRoot: "2.16.528.1.1007.3.2", root: "2.16.840.1.113883.2.4.3.11.4", extension: "for-viewer", uziMembershipNumber: "90000380", locality: "CD", type: {}, gatewayServiceBean: {}},
        {username: "a3", password: "a", displayName: "a3", ipAddress: "192.168.1.1", secondaryIpAddress: "127.0.0.1", fullyQualifiedDomainName: "demo236.demo.enovation.net", emailAddress: "test@test.com", telephone: "000123456", organizationName: "a", organizationalUnitName: "a", applications: [], activeCertificate: {}, certificates: [], active: false, id: "3", messageIdRoot: "2.16.528.1.1007.3.2", root: "2.16.840.1.113883.2.4.3.11.4", extension: "for-viewer", uziMembershipNumber: "90000380", locality: "CD", type: {}, gatewayServiceBean: {}},
        {username: "a4", password: "a", displayName: "a4", ipAddress: "192.168.1.1", secondaryIpAddress: "127.0.0.1", fullyQualifiedDomainName: "demo236.demo.enovation.net", emailAddress: "test@test.com", telephone: "000123456", organizationName: "a", organizationalUnitName: "a", applications: [], activeCertificate: {}, certificates: [], active: false, id: "4", messageIdRoot: "2.16.528.1.1007.3.2", root: "2.16.840.1.113883.2.4.3.11.4", extension: "for-viewer", uziMembershipNumber: "90000380", locality: "CD", type: {}, gatewayServiceBean: {}},
        {username: "a5", password: "a", displayName: "a5", ipAddress: "192.168.1.1", secondaryIpAddress: "127.0.0.1", fullyQualifiedDomainName: "demo236.demo.enovation.net", emailAddress: "test@test.com", telephone: "000123456", organizationName: "a", organizationalUnitName: "a", applications: [], activeCertificate: {}, certificates: [], active: true, id: "5", messageIdRoot: "2.16.528.1.1007.3.2", root: "2.16.840.1.113883.2.4.3.11.4", extension: "for-viewer", uziMembershipNumber: "90000380", locality: "CD", type: {}, gatewayServiceBean: {}},
        {username: "a6", password: "a", displayName: "a6", ipAddress: "192.168.1.1", secondaryIpAddress: "127.0.0.1", fullyQualifiedDomainName: "demo236.demo.enovation.net", emailAddress: "test@test.com", telephone: "000123456", organizationName: "a", organizationalUnitName: "a", applications: [], activeCertificate: {}, certificates: [], active: true, id: "6", messageIdRoot: "2.16.528.1.1007.3.2", root: "2.16.840.1.113883.2.4.3.11.4", extension: "for-viewer", uziMembershipNumber: "90000380", locality: "CD", type: {}, gatewayServiceBean: {}},
        {username: "a7", password: "a", displayName: "a", ipAddress: "192.168.1.1", secondaryIpAddress: "127.0.0.1", fullyQualifiedDomainName: "demo236.demo.enovation.net", emailAddress: "test@test.com", telephone: "000123456", organizationName: "a", organizationalUnitName: "a", applications: [], activeCertificate: {}, certificates: [], active: false, id: "7", messageIdRoot: "2.16.528.1.1007.3.2", root: "2.16.840.1.113883.2.4.3.11.4", extension: "for-viewer", uziMembershipNumber: "90000380", locality: "CD", type: {}, gatewayServiceBean: {}},
        {username: "a8", password: "a", displayName: "a8", ipAddress: "192.168.1.1", secondaryIpAddress: "127.0.0.1", fullyQualifiedDomainName: "demo236.demo.enovation.net", emailAddress: "test@test.com", telephone: "000123456", organizationName: "a", organizationalUnitName: "a", applications: [], activeCertificate: {}, certificates: [], active: true, id: "8", messageIdRoot: "2.16.528.1.1007.3.2", root: "2.16.840.1.113883.2.4.3.11.4", extension: "for-viewer", uziMembershipNumber: "90000380", locality: "CD", type: {}, gatewayServiceBean: {}},
        {username: "a9", password: "a", displayName: "a9", ipAddress: "192.168.1.1", secondaryIpAddress: "127.0.0.1", fullyQualifiedDomainName: "demo236.demo.enovation.net", emailAddress: "test@test.com", telephone: "000123456", organizationName: "a", organizationalUnitName: "a", applications: [], activeCertificate: {}, certificates: [], active: true, id: "9", messageIdRoot: "2.16.528.1.1007.3.2", root: "2.16.840.1.113883.2.4.3.11.4", extension: "for-viewer", uziMembershipNumber: "90000380", locality: "CD", type: {}, gatewayServiceBean: {}},
        {username: "a10", password: "a", displayName: "a10", ipAddress: "192.168.1.1", secondaryIpAddress: "127.0.0.1", fullyQualifiedDomainName: "demo236.demo.enovation.net", emailAddress: "test@test.com", telephone: "000123456", organizationName: "a", organizationalUnitName: "a", applications: [], activeCertificate: {}, certificates: [], active: false, id: "10", messageIdRoot: "2.16.528.1.1007.3.2", root: "2.16.840.1.113883.2.4.3.11.4", extension: "for-viewer", uziMembershipNumber: "90000380", locality: "CD", type: {}, gatewayServiceBean: {}},
        {username: "a11", password: "a", displayName: "a11", ipAddress: "192.168.1.1", secondaryIpAddress: "127.0.0.1", fullyQualifiedDomainName: "demo236.demo.enovation.net", emailAddress: "test@test.com", telephone: "000123456", organizationName: "a", organizationalUnitName: "a", applications: [], activeCertificate: {}, certificates: [], active: true, id: "11", messageIdRoot: "2.16.528.1.1007.3.2", root: "2.16.840.1.113883.2.4.3.11.4", extension: "for-viewer", uziMembershipNumber: "90000380", locality: "CD", type: {}, gatewayServiceBean: {}},
        {username: "a12", password: "a", displayName: "a12", ipAddress: "192.168.1.1", secondaryIpAddress: "127.0.0.1", fullyQualifiedDomainName: "demo236.demo.enovation.net", emailAddress: "test@test.com", telephone: "000123456", organizationName: "a", organizationalUnitName: "a", applications: [], activeCertificate: {}, certificates: [], active: false, id: "12", messageIdRoot: "2.16.528.1.1007.3.2", root: "2.16.840.1.113883.2.4.3.11.4", extension: "for-viewer", uziMembershipNumber: "90000380", locality: "CD", type: {}, gatewayServiceBean: {}},
        {username: "a13", password: "a", displayName: "a13", ipAddress: "192.168.1.1", secondaryIpAddress: "127.0.0.1", fullyQualifiedDomainName: "demo236.demo.enovation.net", emailAddress: "test@test.com", telephone: "000123456", organizationName: "a", organizationalUnitName: "a", applications: [], activeCertificate: {}, certificates: [], active: true, id: "13", messageIdRoot: "2.16.528.1.1007.3.2", root: "2.16.840.1.113883.2.4.3.11.4", extension: "for-viewer", uziMembershipNumber: "90000380", locality: "CD", type: {}, gatewayServiceBean: {}}
    ];
    response.json(200, result);
});

app.get('/system-console-api/application/:id', function (request, response) {
    var result = [
        {id: 1, connectedTo: "test", xisAddress: "192.168.155.63:8999", vendor: "Pharmapartners", version: "migration-to-6100", applicationName: "app1", hl7DeviceRoot: "2.16.840.1.113883.2.4.6.6", hl7DeviceExtension: "90000102", email: "test@test.com", telephoneNumber: "000" },
        {id: 2, connectedTo: "production", xisAddress: "192.168.155.63:8999", vendor: "Pharmapartners", version: "migration-to-6100", applicationName: "app2", hl7DeviceRoot: "2.16.840.1.113883.2.4.6.6", hl7DeviceExtension: "90000102", email: "test@test.com", telephoneNumber: "000" }
    ];
    response.json(200, result);
});

app.get('/system-console-api/configuration/:id/gateway-service', function (request, response) {
    var result = [
        {id: 1, ipAddress: "192.168.153.55", name: "test1"},
        {id: 2, ipAddress: "192.168.153.56", name: "test2"},
        {id: 3, ipAddress: "192.168.153.57", name: "test3"},
        {id: 4, ipAddress: "192.168.153.58", name: "test4"},
        {id: 5, ipAddress: "192.168.153.59", name: "test5"},
        {id: 6, ipAddress: "192.168.153.50", name: "test6"},
        {id: 7, ipAddress: "192.168.153.51", name: "test7"},
        {id: 8, ipAddress: "192.168.153.8", name: "test8"},
        {id: 9, ipAddress: "192.168.153.9", name: "test9"},
        {id: 10, ipAddress: "192.168.153.10", name: "test10"},
        {id: 11, ipAddress: "192.168.153.11", name: "test11"},
        {id: 12, ipAddress: "192.168.153.12", name: "test12"}
    ];
    response.json(200, result);
});

app.get('/system-console-api/application/:id/overrides', function (request, response) {
    var result = [
        {displayName: "Medicatieverstrekker (MG) 6.x.x.x", operations: [
            {soapAction: "urn:hl7-org:v3/Ping_PingPong", address: "Ping"},
            {soapAction: "urn:hl7-org:v3/Ping_TickTock", address: "Ping"}
        ]},
        {displayName: "Medicatieraadpleger (MG) 6.x.x.x", operations: [
            {soapAction: "urn:hl7-org:v3/VerwijderdeAanmeldingenSignaleren_Melding", address: "VerwijderdeAanmeldingenSignaleren"},
            {soapAction: "urn:hl7-org:v3/VerstrekkingsLijstqueryBatch_QueryResponse", address: "VerstrekkingsLijstqueryBatch"},
            {soapAction: "urn:hl7-org:v3/VerstrekkingsLijstquery_QueryResponse", address: "VerstrekkingsLijstquery"}
        ]}
    ];
    response.json(200, result);
});

app.get('/system-console-api/organization/all', function (request, response) {
    var result = [
        {id: 1, uziMembershipNumber: "90000380"},
        {id: 2, uziMembershipNumber: "00000000"}
    ];
    response.json(200, result);
});

app.get('/system-console-api/qualifiedApplicationRole/applicationRoles', function (request, response) {
    var result = [
        {id: 1, displayName: "Medicatieverstrekker (MG) 6.x.x.x"},
        {id: 2, displayName: "Medicatiebewaker (ICA/MB) 6.x.x.x"},
        {id: 3, displayName: "Waarnemend huisarts (HWG) 6.x.x.x"},
        {id: 4, displayName: "Huisartsdossierhouder (HWG) 6.x.x.x"},
        {id: 5, displayName: "Goed Beheerd Patiëntenportaal (INPA) 6.8.0.0"},
        {id: 6, displayName: "APF Bewerkend systeem, zie [PvE GBx Rollen]"},
        {id: 7, displayName: "Abonnerend systeem sinds 6.9.0.0"},
        {id: 8, displayName: "Signaal notificatie ontvangend systeem sinds 6.9.0.0"},
        {id: 9, displayName: "Verwijsindex bewerkend systeem"},
        {id: 10, displayName: "Zorgadresboek Raadplegend systeem AORTA 2011"},
        {id: 11, displayName: "Medicatiebewakend systeem, zie [PvE Mp]"},
        {id: 12, displayName: "Conditiebeschikbaarstellend systeem, zie [PvE Mp]"},
        {id: 13, displayName: "SBV-z AORTA 2011"}
    ];
    response.json(200, result);
});

app.get('/system-console-api/qualifiedApplicationRole/applicationRoles/:id', function (request, response) {
    var result;
    if (request.params.id == 1) {
        result = [
            {id: 1, displayName: "Medicatieverstrekker (MG) 6.x.x.x", verificationId: "123"},
            {id: 2, displayName: "Medicatiebewaker (ICA/MB) 6.x.x.x", verificationId: "456"}
        ];
    } else {
        result = [
            {id: 1, displayName: "Verwijsindex bewerkend systeem", verificationId: "777"},
            {id: 2, displayName: "SBV-z AORTA 2011", verificationId: "888"}
        ];
    }
    response.json(200, result);
});

app.get('/system-console-api/qualifiedApplicationRole/all', function (request, response) {
    var result = [
        {id: 1, vendor: "1", version: "1.1", softwareName: "a", displayName: "test1"},
        {id: 2, vendor: "2", version: "1.2", softwareName: "b", displayName: "test2"}
    ];
    response.json(200, result);
});

app.get('/system-console-api/audit-log', function (request, response) {
    var result = [
        {"reason": null, "acknowledgementTypeCode": null, "interactionDescription": "Opvragen medicatieverstrekkingenlijst", "fault": true, "invocationId": "acbfd8ef-3cb3-4c94-941e-f9db055ae217", "direction": "OUTBOUND", "garbage": true, "messageType": "REQUEST", "emergency": true, "acknowledgementDetail": null, "belongsToCurrentUser": false, "acknowledgementTargetMessageIdExtension": null, "acknowledgementTargetMessageIdRoot": null, "authorOrPerformerIdExtension": "900009979", "authorOrPerformerIdRoot": "2.16.528.1.1007.3.1", "authorOrPerformerOrganizationIdExtension": "90000380", "authorOrPerformerOrganizationIdRoot": "2.16.528.1.1007.3.3", "authorOrPerformerOrganizationName": "medication-viewer", "authorOrPerformerRoleCode": "", "bsnExtension": "123456782", "bsnRoot": "2.16.840.1.113883.2.4.6.3", "episodeExtension": null, "episodeRoot": null, "idExtension": "1368693452611e2adfb24-4dfb-4b45-a43e-be0eafd1678b", "idRoot": "2.16.528.1.1007.3.2", "interactionIdExtension": "QURX_IN990111NL", "interactionIdRoot": "2.16.840.1.113883.1.6", "patientFileIdRoot": null, "patientFileExtension": null, "overseerIdExtension": "900005259", "overseerIdRoot": "2.16.528.1.1007.3.1", "overseerOrganizationIdExtension": "90000380", "overseerOrganizationIdRoot": "2.16.528.1.1007.3.3", "overseerOrganizationName": "medication-viewer", "overseerRoleCode": "01.015", "receiverRoot": "2.16.840.1.113883.2.4.6.6", "senderRoot": "2.16.840.1.113883.2.4.6.6", "systemIdExtension": "90121", "systemIdRoot": "2.16.528.1.1007.3.2", "receiveTime": 1368693455000, "receiverExtension": "1", "senderExtension": "90000102"},
        {"reason": null, "acknowledgementTypeCode": null, "interactionDescription": null, "fault": true, "invocationId": "acbfd8ef-3cb3-4c94-941e-f9db055ae217", "direction": "OUTBOUND", "garbage": true, "messageType": "RESPONSE", "emergency": true, "acknowledgementDetail": null, "belongsToCurrentUser": false, "acknowledgementTargetMessageIdExtension": null, "acknowledgementTargetMessageIdRoot": null, "authorOrPerformerIdExtension": null, "authorOrPerformerIdRoot": null, "authorOrPerformerOrganizationIdExtension": null, "authorOrPerformerOrganizationIdRoot": null, "authorOrPerformerOrganizationName": null, "authorOrPerformerRoleCode": null, "bsnExtension": null, "bsnRoot": null, "episodeExtension": null, "episodeRoot": null, "idExtension": null, "idRoot": null, "interactionIdExtension": null, "interactionIdRoot": null, "patientFileIdRoot": null, "patientFileExtension": null, "overseerIdExtension": null, "overseerIdRoot": null, "overseerOrganizationIdExtension": null, "overseerOrganizationIdRoot": null, "overseerOrganizationName": null, "overseerRoleCode": null, "receiverRoot": null, "senderRoot": null, "systemIdExtension": "90121", "systemIdRoot": "2.16.528.1.1007.3.2", "receiveTime": 1368693455000, "receiverExtension": null, "senderExtension": null},
        {"reason": null, "acknowledgementTypeCode": null, "interactionDescription": "Opvragen medicatieverstrekkingenlijst", "fault": true, "invocationId": "0ff05030-4d9d-4c0f-93a0-782e0ec038b9", "direction": "OUTBOUND", "garbage": true, "messageType": "REQUEST", "emergency": true, "acknowledgementDetail": null, "belongsToCurrentUser": false, "acknowledgementTargetMessageIdExtension": null, "acknowledgementTargetMessageIdRoot": null, "authorOrPerformerIdExtension": "900009979", "authorOrPerformerIdRoot": "2.16.528.1.1007.3.1", "authorOrPerformerOrganizationIdExtension": "90000380", "authorOrPerformerOrganizationIdRoot": "2.16.528.1.1007.3.3", "authorOrPerformerOrganizationName": "medication-viewer", "authorOrPerformerRoleCode": "", "bsnExtension": "123456782", "bsnRoot": "2.16.840.1.113883.2.4.6.3", "episodeExtension": null, "episodeRoot": null, "idExtension": "1368692237005a3787980-db8a-46f2-9d78-970ae2de4c0b", "idRoot": "2.16.528.1.1007.3.2", "interactionIdExtension": "QURX_IN990111NL", "interactionIdRoot": "2.16.840.1.113883.1.6", "patientFileIdRoot": null, "patientFileExtension": null, "overseerIdExtension": "900005259", "overseerIdRoot": "2.16.528.1.1007.3.1", "overseerOrganizationIdExtension": "90000380", "overseerOrganizationIdRoot": "2.16.528.1.1007.3.3", "overseerOrganizationName": "medication-viewer", "overseerRoleCode": "01.015", "receiverRoot": "2.16.840.1.113883.2.4.6.6", "senderRoot": "2.16.840.1.113883.2.4.6.6", "systemIdExtension": "90121", "systemIdRoot": "2.16.528.1.1007.3.2", "receiveTime": 1368692245000, "receiverExtension": "1", "senderExtension": "90000102"},
        {"reason": null, "acknowledgementTypeCode": null, "interactionDescription": null, "fault": true, "invocationId": "0ff05030-4d9d-4c0f-93a0-782e0ec038b9", "direction": "OUTBOUND", "garbage": true, "messageType": "RESPONSE", "emergency": true, "acknowledgementDetail": null, "belongsToCurrentUser": false, "acknowledgementTargetMessageIdExtension": null, "acknowledgementTargetMessageIdRoot": null, "authorOrPerformerIdExtension": null, "authorOrPerformerIdRoot": null, "authorOrPerformerOrganizationIdExtension": null, "authorOrPerformerOrganizationIdRoot": null, "authorOrPerformerOrganizationName": null, "authorOrPerformerRoleCode": null, "bsnExtension": null, "bsnRoot": null, "episodeExtension": null, "episodeRoot": null, "idExtension": null, "idRoot": null, "interactionIdExtension": null, "interactionIdRoot": null, "patientFileIdRoot": null, "patientFileExtension": null, "overseerIdExtension": null, "overseerIdRoot": null, "overseerOrganizationIdExtension": null, "overseerOrganizationIdRoot": null, "overseerOrganizationName": null, "overseerRoleCode": null, "receiverRoot": null, "senderRoot": null, "systemIdExtension": "90121", "systemIdRoot": "2.16.528.1.1007.3.2", "receiveTime": 1368692245000, "receiverExtension": null, "senderExtension": null},
        {"reason": null, "acknowledgementTypeCode": null, "interactionDescription": "Opvragen medicatieverstrekkingenlijst", "fault": true, "invocationId": "56e2c032-d0ba-4240-b29e-4ac737cdb1e8", "direction": "OUTBOUND", "garbage": true, "messageType": "REQUEST", "emergency": true, "acknowledgementDetail": null, "belongsToCurrentUser": false, "acknowledgementTargetMessageIdExtension": null, "acknowledgementTargetMessageIdRoot": null, "authorOrPerformerIdExtension": "900009979", "authorOrPerformerIdRoot": "2.16.528.1.1007.3.1", "authorOrPerformerOrganizationIdExtension": "90000380", "authorOrPerformerOrganizationIdRoot": "2.16.528.1.1007.3.3", "authorOrPerformerOrganizationName": "medication-viewer", "authorOrPerformerRoleCode": "", "bsnExtension": "123456782", "bsnRoot": "2.16.840.1.113883.2.4.6.3", "episodeExtension": null, "episodeRoot": null, "idExtension": "13686894264821797725b-3293-4719-b167-15c2dd3aa62b", "idRoot": "2.16.528.1.1007.3.2", "interactionIdExtension": "QURX_IN990111NL", "interactionIdRoot": "2.16.840.1.113883.1.6", "patientFileIdRoot": null, "patientFileExtension": null, "overseerIdExtension": "900005259", "overseerIdRoot": "2.16.528.1.1007.3.1", "overseerOrganizationIdExtension": "90000380", "overseerOrganizationIdRoot": "2.16.528.1.1007.3.3", "overseerOrganizationName": "medication-viewer", "overseerRoleCode": "01.015", "receiverRoot": "2.16.840.1.113883.2.4.6.6", "senderRoot": "2.16.840.1.113883.2.4.6.6", "systemIdExtension": "90121", "systemIdRoot": "2.16.528.1.1007.3.2", "receiveTime": 1368689436000, "receiverExtension": "1", "senderExtension": "90000102"},
        {"reason": null, "acknowledgementTypeCode": null, "interactionDescription": null, "fault": true, "invocationId": "56e2c032-d0ba-4240-b29e-4ac737cdb1e8", "direction": "OUTBOUND", "garbage": true, "messageType": "RESPONSE", "emergency": true, "acknowledgementDetail": null, "belongsToCurrentUser": false, "acknowledgementTargetMessageIdExtension": null, "acknowledgementTargetMessageIdRoot": null, "authorOrPerformerIdExtension": null, "authorOrPerformerIdRoot": null, "authorOrPerformerOrganizationIdExtension": null, "authorOrPerformerOrganizationIdRoot": null, "authorOrPerformerOrganizationName": null, "authorOrPerformerRoleCode": null, "bsnExtension": null, "bsnRoot": null, "episodeExtension": null, "episodeRoot": null, "idExtension": null, "idRoot": null, "interactionIdExtension": null, "interactionIdRoot": null, "patientFileIdRoot": null, "patientFileExtension": null, "overseerIdExtension": null, "overseerIdRoot": null, "overseerOrganizationIdExtension": null, "overseerOrganizationIdRoot": null, "overseerOrganizationName": null, "overseerRoleCode": null, "receiverRoot": null, "senderRoot": null, "systemIdExtension": "90121", "systemIdRoot": "2.16.528.1.1007.3.2", "receiveTime": 1368689436000, "receiverExtension": null, "senderExtension": null}
    ];
    response.json(200, result);
});

app.get('/system-console-api/audit-log-content', function (request, response) {
    var result = '&lt;SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"&gt;&lt;SOAP-ENV:Header&gt;&lt;authenticationTokens xmlns="http://www.aortarelease.nl/805/" SOAP-ENV:mustUnderstand="1"&gt;&lt;signedData xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" wsu:Id="token_2.16.528.1.1007.3.2_1368693452611e2adfb24-4dfb-4b45-a43e-be0eafd1678b"&gt;&lt;authenticationData&gt;&lt;messageId&gt;&lt;root&gt;2.16.528.1.1007.3.2&lt;/root&gt;&lt;extension&gt;1368693452611e2adfb24-4dfb-4b45-a43e-be0eafd1678b&lt;/extension&gt;&lt;/messageId&gt;&lt;notBefore&gt;20130516083732&lt;/notBefore&gt;&lt;notAfter&gt;20130516084232&lt;/notAfter&gt;&lt;addressedParty&gt;&lt;root&gt;2.16.840.1.113883.2.4.6.6&lt;/root&gt;&lt;extension&gt;1&lt;/extension&gt;&lt;/addressedParty&gt;&lt;/authenticationData&gt;&lt;coSignedData&gt;&lt;triggerEventId&gt;QURX_TE990011NL&lt;/triggerEventId&gt;&lt;patientId&gt;&lt;root&gt;2.16.840.1.113883.2.4.6.3&lt;/root&gt;&lt;extension&gt;123456782&lt;/extension&gt;&lt;/patientId&gt;&lt;/coSignedData&gt;&lt;/signedData&gt;&lt;/authenticationTokens&gt;&lt;Security xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" SOAP-ENV:mustUnderstand="1"&gt;&lt;Signature xmlns="http://www.w3.org/2000/09/xmldsig#"&gt;&lt;SignedInfo&gt;&lt;CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/&gt;&lt;SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/&gt;&lt;Reference URI="#token_2.16.528.1.1007.3.2_1368693452611e2adfb24-4dfb-4b45-a43e-be0eafd1678b"&gt;&lt;Transforms&gt;&lt;Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/&gt;&lt;/Transforms&gt;&lt;DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/&gt;&lt;DigestValue&gt;I79277kH/iMvmAxKBLSXKp6acY4=&lt;/DigestValue&gt;&lt;/Reference&gt;&lt;/SignedInfo&gt;&lt;SignatureValue&gt;WbnffuuruX9t1l6D/FumwV/5EV7Bh2v5FBnkXzXUnisNGoFcsPvXGspPn6yA3fZTL+PC8ly+Yzit' +
        'MWGqyg3gXVjDs8F8pYhZCf7uHvtJkNLwENW2ibU90wY4dNmjy7YxyYGtlzW5mVKQhUEiupWfHMvO' +
        'xXT4Q6xokLZG529MzER8fgKUZ+fIh0Hgn9Y3dHjNHyX84l+CzT7Y9myMQPhthKU3B31wihPcVKzQ' +
        't+u5/HNeg476M2mBrnd28RQQWD2+TjyNksu9Sw2ghEtb9vP1uH+/5V6qVPyEtCH8MJbEn6VW5iiu' +
        'LModjnB+ilscuiB/J8wX0ua3qX8FDTRGghqvgw==&lt;/SignatureValue&gt;&lt;KeyInfo&gt;&lt;SecurityTokenReference xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"&gt;&lt;X509Data xmlns="http://www.w3.org/2000/09/xmldsig#"&gt;&lt;X509IssuerSerial&gt;&lt;X509IssuerName&gt;CN=TEST UZI-register Medewerker op naam CA G21, O=agentschap Centraal Informatiepunt Beroepen Gezondheidszorg, C=NL&lt;/X509IssuerName&gt;&lt;X509SerialNumber&gt;63224623159774502141305523579736408386&lt;/X509SerialNumber&gt;&lt;/X509IssuerSerial&gt;&lt;/X509Data&gt;&lt;/SecurityTokenReference&gt;&lt;/KeyInfo&gt;&lt;/Signature&gt;&lt;/Security&gt;&lt;/SOAP-ENV:Header&gt;&lt;SOAP-ENV:Body&gt;&lt;QURX_IN990111NL xmlns="urn:hl7-org:v3"&gt;' +
        '&lt;id extension="1368693452611e2adfb24-4dfb-4b45-a43e-be0eafd1678b" root="2.16.528.1.1007.3.2"/&gt;' +
        '&lt;creationTime value="20130411050935"/&gt;' +
        '&lt;versionCode code="NICTIZEd2005-Okt"/&gt;' +
        '&lt;interactionId extension="QURX_IN990111NL" root="2.16.840.1.113883.1.6"/&gt;' +
        '&lt;profileId extension="810" root="2.16.840.1.113883.2.4.3.11.1"/&gt;' +
        '&lt;processingCode code="P"/&gt;' +
        '&lt;processingModeCode code="T"/&gt;' +
        '&lt;acceptAckCode code="NE"/&gt;' +
        '&lt;receiver&gt;' +
        '&lt;device classCode="DEV" determinerCode="INSTANCE"&gt;' +
        '&lt;id extension="1" root="2.16.840.1.113883.2.4.6.6"/&gt;' +
        '&lt;/device&gt;' +
        '&lt;/receiver&gt;' +
        '&lt;sender&gt;' +
        '&lt;device classCode="DEV" determinerCode="INSTANCE"&gt;' +
        '&lt;id extension="90000102" root="2.16.840.1.113883.2.4.6.6"/&gt;' +
        '&lt;/device&gt;' +
        '&lt;/sender&gt;' +
        '&lt;ControlActProcess moodCode="EVN"&gt;' +
        '&lt;authorOrPerformer typeCode="AUT"&gt;' +
        '&lt;participant&gt;' +
        '&lt;AssignedPerson&gt;' +
        '&lt;id extension="900008176" root="2.16.528.1.1007.3.1"/&gt;' +
        '&lt;Organization&gt;' +
        '&lt;id extension="90000380" root="2.16.528.1.1007.3.3"/&gt;' +
        '&lt;name&gt;medication-viewer&lt;/name&gt;' +
        '&lt;/Organization&gt;' +
        '&lt;/AssignedPerson&gt;' +
        '&lt;/participant&gt;' +
        '&lt;/authorOrPerformer&gt;' +
        '&lt;overseer typeCode="RESP"&gt;' +
        '&lt;assignedEntity&gt;' +
        '&lt;id extension="900005259" root="2.16.528.1.1007.3.1"/&gt;' +
        '&lt;code code="01.015" codeSystem="2.16.840.1.113883.2.4.15.111" displayName="Huisarts"/&gt;' +
        '&lt;assignedPrincipalChoiceList&gt;' +
        '&lt;assignedPerson&gt;' +
        '&lt;name&gt;' +
        '&lt;family&gt;Hendrika test-n2057&lt;/family&gt;' +
        '&lt;/name&gt;' +
        '&lt;/assignedPerson&gt;' +
        '&lt;/assignedPrincipalChoiceList&gt;' +
        '&lt;Organization&gt;' +
        '&lt;id extension="90000380" root="2.16.528.1.1007.3.3"/&gt;' +
        '&lt;code code="Z3" codeSystem="2.16.840.1.113883.2.4.15.1060" displayName="Huisartspraktijk"/&gt;' +
        '&lt;name&gt;medication-viewer&lt;/name&gt;' +
        '&lt;addr&gt;' +
        '&lt;city&gt;cd&lt;/city&gt;' +
        '&lt;/addr&gt;' +
        '&lt;/Organization&gt;' +
        '&lt;/assignedEntity&gt;' +
        '&lt;/overseer&gt;' +
        '&lt;queryByParameter&gt;' +
        '&lt;queryId extension="6c31cb55-e36b-4a3f-8eaa-899201ea61a8" root="1.3.6.1.4.1.19519.9.1.6.1.90000102"/&gt;' +
        '&lt;statusCode code="executing"/&gt;' +
        '&lt;responseModalityCode code="B"/&gt;' +
        '&lt;responsePriorityCode code="I"/&gt;' +
        '&lt;dispenseEventEffectiveTimeInterval&gt;' +
        '&lt;value&gt;' +
        '&lt;low value="201302140000"/&gt;' +
        '&lt;/value&gt;' +
        '&lt;/dispenseEventEffectiveTimeInterval&gt;' +
        '&lt;mostRecentDispenseForEachRxIndicator&gt;' +
        '&lt;value value="false"/&gt;' +
        '&lt;/mostRecentDispenseForEachRxIndicator&gt;' +
        '&lt;patientID&gt;' +
        '&lt;value extension="123456782" root="2.16.840.1.113883.2.4.6.3"/&gt;' +
        '&lt;/patientID&gt;' +
        '&lt;/queryByParameter&gt;' +
        '&lt;/ControlActProcess&gt;&lt;br&gt;' +
        '&lt;/QURX_IN990111NL&gt;&lt;/SOAP-ENV:Body&gt;&lt;/SOAP-ENV:Envelope&gt;';
    response.set('Content-Type', 'text/plain');
    response.send(200, result);
});

app.get('/system-console-api/interactions', function (request, response) {
    var result = [
        {"name": "Verifiëren applicatiekoppeling", "value": "COMT_IN118118"},
        {"name": "Verifiëren applicatiekoppeling antwoord", "value": "COMT_IN229229"},
        {"name": "Verifiëren communicatiekoppeling", "value": "COMT_IN113113NL"},
        {"name": "Ontvangstbevestiging", "value": "MCCI_IN000002"},
        {"name": "Opvragen medicatieverstrekkingen", "value": "QURX_IN990011NL"},
        {"name": "Opleveren medicatieverstrekkingen", "value": "QURX_IN990013NL"},
        {"name": "Opvragen medicatieverstrekkingenlijst", "value": "QURX_IN990111NL"},
        {"name": "Opleveren medicatieverstrekkingenlijst", "value": "QURX_IN990113NL"},
        {"name": "Batchantwoord", "value": "MCCI_IN200101"},
        {"name": "Opvragen patiënt", "value": "QUPA_IN101103"},
        {"name": "Opleveren patiënt", "value": "QUPA_IN101104"},
        {"name": "Opvragen patiëntstamgegevens", "value": "QUPA_IN101101"},
        {"name": "Opleveren patiëntstamgegevens", "value": "QUPA_IN101102"},
        {"name": "Opvragen omloopstatus WID", "value": "PRPA_IN900111NL"},
        {"name": "Opleveren Omloopstatus WID", "value": "PRPA_IN900112NL"},
        {"name": "Aanmelden patiëntgegevens", "value": "MFMT_IN002101"},
        {"name": "Heraanmelden patiëntgegevens", "value": "MFMT_IN002102"},
        {"name": "Afmelden patiëntgegevens", "value": "MFMT_IN002103"},
        {"name": "Opvragen indexgegevens", "value": "QUMT_IN020010"},
        {"name": "Opleveren indexgegevens", "value": "QUMT_IN020020"},
        {"name": "Opvragen indexgegevens met gegevensbeheerder", "value": "QUMT_IN020011NL"},
        {"name": "Opleveren indexgegevens met gegevensbeheerder", "value": "QUMT_IN020021NL"},
        {"name": "Opvragen zorgverlenerdetails", "value": "PRPM_IN906010NL"},
        {"name": "Opleveren zorgverlenerdetails", "value": "PRPM_IN906110NL"},
        {"name": "Opvragen organisaties", "value": "PRPM_IN405010NL"},
        {"name": "Opleveren organisaties", "value": "PRPM_IN405110NL"},
        {"name": "Opvragen condities", "value": "REPC_IN000023NL"},
        {"name": "Opleveren condities", "value": "REPC_IN000024NL"},
        {"name": "Opvragen professionele samenvatting", "value": "QUPC_IN990001NL"},
        {"name": "Opleveren professionele samenvatting", "value": "QUPC_IN990002NL"},
        {"name": "Versturen waarneemverslag", "value": "REPC_IN990003NL"},
        {"name": "Opvragen medicatievoorschriftenlijst", "value": "QURX_IN990101NL"},
        {"name": "Opleveren medicatievoorschriftenlijst", "value": "QURX_IN990103NL"},
        {"name": "Signaleren eerste aanmelding", "value": "MFMT_IN002104NL01"},
        {"name": "Signaleren verwijderen alle indexgegevens", "value": "MFMT_IN002106NL01"},
        {"name": "Opvragen zorgaanbiederapplicatie", "value": "PRPM_IN907020NL02"},
        {"name": "Opleveren zorgaanbiederapplicaties", "value": "PRPM_IN907120NL02"},
        {"name": "Opvragen interactieversie", "value": "PRPM_IN907030NL"},
        {"name": "Opleveren interactieversie", "value": "PRPM_IN907130NL"},
        {"name": "Signalering met abonnement", "value": "QUMT_IN900010NL"},
        {"name": "Registratie abonnement", "value": "QUMT_IN900008NL"},
        {"name": "Antwoord registratie abonnement", "value": "QUMT_IN900009NL"},
        {"name": "Opvragen abonnementen", "value": "QUMT_IN900013NL"},
        {"name": "Opleveren abonnementen", "value": "QUMT_IN900014NL"},
        {"name": "Algemene vraag continueren of afbreken oplevering", "value": "QUQI_IN000003UV"},
        {"name": "Algemeen antwoord voltooide oplevering", "value": "QUQI_IN000002UV"},
        {"name": "Signalering zonder abonnement", "value": "COMT_IN900010NL"},
        {"name": "Heraanmelden patiëntgegevens", "value": "MFMT_IN002202NL"},
        {"name": "Afwijzen indexverzoek", "value": "MFMT_IN002310NL"},
        {"name": "Accepteren indexverzoek", "value": "MFMT_IN002320NL"},
        {"name": "Opvragen indexgegevens met gegevensbeheerder", "value": "QUMT_IN020011NL02"},
        {"name": "Opleveren indexgegevens met gegevensbeheerder", "value": "QUMT_IN020021NL02"},
        {"name": "Opvragen zorgaanbiederdetails", "value": "PRPM_IN406010NL"},
        {"name": "Opleveren zorgaanbiederdetails", "value": "PRPM_IN406110NL"},
        {"name": "Versturen medicatievoorschrift", "value": "PORX_IN932000NL"},
        {"name": "Versturen medicatievoorschrift met handtekening", "value": "PORX_IN932100NL"},
        {"name": "Versturen medicatieverstrekking", "value": "PORX_IN924000NL"}
    ];
    response.json(200, result);
});

app.get('/system-console-api/roots', function (request, response) {
    var result = [
        {"rootName": "BSN", "rootValue": "2.16.840.1.113883.2.4.6.3"},
        {"rootName": "APPLICATION_ID", "rootValue": "2.16.840.1.113883.2.4.6.6"},
        {"rootName": "UZI_NUMBER_PERSON", "rootValue": "2.16.528.1.1007.3.1"},
        {"rootName": "UZI_NUMBER_SYSTEM", "rootValue": "2.16.528.1.1007.3.2"},
        {"rootName": "UZI_REGISTRY_MEMBERSHIP_NUMBER", "rootValue": "2.16.528.1.1007.3.3"}
    ];
    response.json(200, result);
});

app.get('/system-console-api/certificate/all', function (request, response) {
    var result = [
        {alias: "uzi900010079", serialNumber: "bb1d2b740b2e9ad0fdc0a7daea14bc49", uziNumber: "900010079", uziMemberShipNumber: "90000380", validFrom: "2013/12/11 13:00:00", validTo: "2016/12/11 13:00:00", subject: "SERIALNUMBER=900010079, CN=demo236.demo.enovation.net, O=Tést Zorginstelling 01, C=NL, ST=Zuid-Holland, L=Den Haag", thumbprint: "559c26d571664cef729915e621d58aac0254fc6a", issuer: "CN=TEST UZI-register Server CA G21, O=agentschap Centraal Informatiepunt Beroepen Gezondheidszorg, C=NL", usable: true, certificateSigningCompleted: true,serialNumberAsDecimalString:"248717093158217263706113692249630227529",keyPassword:"pw1370418739067"},
        {alias: "uzi900010213", serialNumber: "bb1d2b740b2e9ad0fdc0a7daea14bc49", uziNumber: "900010213", uziMemberShipNumber: "90000380", validFrom: "2013/1/11 17:00:00", validTo: "2017/12/11 13:00:00", subject: "SERIALNUMBER=900010079, CN=demo236.demo.enovation.net, O=Tést Zorginstelling 01, C=NL, ST=Zuid-Holland, L=Den Haag", thumbprint: "559c26d571664cef729915e621d58aac0254fc6a", issuer: "CN=TEST UZI-register Server CA G21, O=agentschap Centraal Informatiepunt Beroepen Gezondheidszorg, C=NL", usable: false, certificateSigningCompleted: true,serialNumberAsDecimalString:"248717093158217263706113692249630227529",keyPassword:"pw1370418739067"},
        {alias: "uzi900010101", serialNumber: "bb1d2b740b2e9ad0fdc0a7daea14bc49", uziNumber: "900010101", uziMemberShipNumber: "90000380", validFrom: "2013/2/11 19:00:00", validTo: "2018/12/11 13:00:00", subject: "SERIALNUMBER=900010079, CN=demo236.demo.enovation.net, O=Tést Zorginstelling 01, C=NL, ST=Zuid-Holland, L=Den Haag", thumbprint: "559c26d571664cef729915e621d58aac0254fc6a", issuer: "CN=TEST UZI-register Server CA G21, O=agentschap Centraal Informatiepunt Beroepen Gezondheidszorg, C=NL", usable: true, certificateSigningCompleted: false,serialNumberAsDecimalString:"248717093158217263706113692249630227529",keyPassword:"pw1370418739067"}
    ];
    response.json(200, result);
});

//db.open(function (err, db) {
//    if (err) throw err;
//    else {
//        console.log('connect successfully');
//        db.close();
//    }
//});
//db.on('close', function (err, db) {
//    if (err) throw err;
//    else console.log('close database');
//});

server.listen(8099);
console.log('listening on port 8099');