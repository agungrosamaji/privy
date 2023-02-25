import api from './api.json'
import users from './users.json'


describe('API Testing ', function () {
    let userid
    let accesstoken

    //register using phone number has not registered
    it('API - POST Register', () => {
        cy.request({
            method: 'POST',
            url: `${api.register_by_phone}`,
            failOnStatusCode: true,
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
        cy.get('@details').its('status').should('eq', 201)
        cy.get('@details').then((response) => {
            let res = response.body
            let post_sugar_id = res.sugar_id
            let userid = res.id
            cy.log(post_sugar_id)
        })
        cy.get('@details').then((response) => {
            cy.log(JSON.stringify(response.body))
        })
    })

    //register using phone number has registered
    it('API - POST Register', () => {
        cy.request({
            method: 'POST',
            url: `${api.register_by_phone}`,
            failOnStatusCode: true,
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
    it('API Post - POST Resend OTP', () => {
        cy.request({
            method: 'POST',
            url: `${config.register_resend_otp}`,
            failOnStatusCode: true,
            body: {
                'phone' : `${users.new_phone}`
            }
        }).as('details')
        //Validate status code
        cy.get('@details').its('status').should('eq', 201)
        cy.get('@details').then((response) => {
            let res = response.body
            let post_sugar_id = res.sugar_id
            cy.log(post_sugar_id)
        })
        cy.get('@details').then((response) => {
            cy.log(JSON.stringify(response.body))
        })
    })

    //resend otp by phone number is not registered
    it('API Post - POST Resend OTP', () => {
        cy.request({
            method: 'POST',
            url: `${config.register_resend_otp}`,
            failOnStatusCode: true,
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
    it('API Post - POST Matching OTP', () => {
        cy.request({
            method: 'POST',
            url: `${config.register_matching_otp}`,
            failOnStatusCode: true,
            body: {
                'user_id ' : userid,
                'otp_code ' : '1234' 
            }
        }).as('details')
        //Validate status code
        cy.get('@details').its('status').should('eq', 201)
        cy.get('@details').then((response) => {
            let res = response.body
            accesstoken = res.access_token
        })
        cy.get('@details').then((response) => {
            cy.log(JSON.stringify(response.body))
        })
    })

    //Input false user_id code for verification phone number
    it('API Post - POST Matching OTP', () => {
        cy.request({
            method: 'POST',
            url: `${config.register_matching_otp}`,
            failOnStatusCode: true,
            body: {
                'user_id ' : `${users.unregistered_user_id}`,
                'otp_code ' : '1234' 
            }
        }).as('details')
        //Validate status code
        cy.get('@details').its('status').should('eq', 500)
        cy.get('@details').then((response) => {
            cy.log(JSON.stringify(response.body))
        })
    })
    
    //Input phone number is registered
    it('API Post - POST Remove Account', () => {
        cy.request({
            method: 'POST',
            url: `${config.register_remove_account}`,
            failOnStatusCode: true,
            body: {
                'phone ' : `${users.remove_phone_number}`
                // 'phone ' : `${users.new_phone}`
            }
        }).as('details')
        //Validate status code
        cy.get('@details').its('status').should('eq', 201)
        cy.get('@details').then((response) => {
            cy.log(JSON.stringify(response.body))
        })
    })

    //Input phone number is registered
    it('API Post - POST Remove Account', () => {
        cy.request({
            method: 'POST',
            url: `${config.register_remove_account}`,
            failOnStatusCode: true,
            body: {
                'phone ' : `${users.unremovable_phone_number}`
                // 'phone ' : `${users.new_phone}`
            }
        }).as('details')
        //Validate status code
        cy.get('@details').its('status').should('eq', 500)
        cy.get('@details').then((response) => {
            cy.log(JSON.stringify(response.body))
        })
    })
})