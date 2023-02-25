import api from './api.json'
import users from './users.json'


describe('API Testing ', function () {
    let userid
    let accesstoken

    //register using phone number has not registered
    it('API - POST Register 1', () => {
        cy.request({
            method: 'POST',
            url: `${api.register_by_phone}`,
            failOnStatusCode: false,
            body: {
                'phone' : `${users.new_phone}`,
                'password' : '123456',
                'country' : 'Indonesia',
                'latlong' : 'ab',
                'device_token' : 'test',
                'device_type' : '1'
            }
        }).as('details')
        //Validate Status Code
        cy.get('@details').then((response) => {
            cy.log(JSON.stringify(response.body))
        })
        cy.get('@details').its('status').should('eq', 201)
        cy.get('@details').then((response) => {
            let res = response.body
            userid = res.data.user.id
            cy.log(userid)
        })
        
    })

    //register using phone number has registered
    it('API - POST Register 2', () => {
        cy.request({
            method: 'POST',
            url: `${api.register_by_phone}`,
            failOnStatusCode: false,
            body: {
                'phone' : `${users.registered_phone}`,
                'password' : '123456',
                'country' : 'Indonesia',
                'latlong' : 'ab',
                'device_token' : 'test',
                'device_type' : '1'
            }
        }).as('details')
        //Validate Status Code
        cy.get('@details').its('status').should('eq', 422)
        cy.get('@details').then((response) => {
            cy.log(JSON.stringify(response.body))
        })
    })

    //resend otp by phone number
    it('API Post - POST Resend OTP 1', () => {
        cy.request({
            method: 'POST',
            url: `${api.register_resend_otp}`,
            failOnStatusCode: false,
            body: {
                'phone' : `${users.new_phone}`
            }
        }).as('details')
        //Validate status code
        cy.get('@details').its('status').should('eq', 201)
        cy.get('@details').then((response) => {
            cy.log(JSON.stringify(response.body))
        })
    })

    //resend otp by phone number is not registered
    it('API Post - POST Resend OTP 2', () => {
        cy.request({
            method: 'POST',
            url: `${api.register_resend_otp}`,
            failOnStatusCode: false,
            body: {
                'phone' : `${users.new_phone}`
            }
        }).as('details')
        //Validate status code
        cy.get('@details').its('status').should('eq', 201)
        cy.get('@details').then((response) => {
            cy.log(JSON.stringify(response.body))
        })
    })

    //Input true OTP code for verification phone number
    it('API Post - POST Matching OTP 1', () => {
        cy.request({
            method: 'POST',
            url: `${api.register_matching_otp}`,
            failOnStatusCode: false,
            body: {
                //'user_id' : userid,
                'user_id' : `${users.registered_user_id}`,
                'otp_code' : '1234' 
            }
        }).as('details')
        //Validate status code
        cy.get('@details').then((response) => {
            cy.log(JSON.stringify(response.body))
        })
        cy.get('@details').its('status').should('eq', 201)
        cy.get('@details').then((response) => {
            let res = response.body
            accesstoken = res.data.user.access_token
            cy.log(accesstoken)
        })
        
    })

    //Input false user_id code for verification phone number
    it('API Post - POST Matching OTP 2', () => {
        cy.request({
            method: 'POST',
            url: `${api.register_matching_otp}`,
            failOnStatusCode: false,
            body: {
                'user_id' : `${users.unregistered_user_id}`,
                'otp_code' : '1234' 
            }
        }).as('details')
        //Validate status code
        cy.get('@details').then((response) => {
            cy.log(JSON.stringify(response.body))
        })
        cy.get('@details').its('status').should('eq', 500)
    })
    
    //Input phone number is registered
    it('API Post - POST Remove Account 1', () => {
        cy.request({
            method: 'POST',
            url: `${api.register_remove_account}`,
            failOnStatusCode: false,
            body: {
                'phone' : `${users.remove_phone_number}`
                // 'phone ' : `${users.new_phone}`
            }
        }).as('details')
        //Validate status code
        cy.get('@details').then((response) => {
            cy.log(JSON.stringify(response.body))
        })
        cy.get('@details').its('status').should('eq', 201)
        
    })

    //Input phone number is registered
    it('API Post - POST Remove Account 2', () => {
        cy.request({
            method: 'POST',
            url: `${api.register_remove_account}`,
            failOnStatusCode: false,
            body: {
                'phone' : `${users.unremovable_phone_number}`
                // 'phone ' : `${users.new_phone}`
            }
        }).as('details')
        //Validate status code
        cy.get('@details').then((response) => {
            cy.log(JSON.stringify(response.body))
        })
        cy.get('@details').its('status').should('eq', 500)
    })
})