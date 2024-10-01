import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


interface PaymentData {
    merchantId: string;
    amount: string;
    currency: string;
    orderId: string;
}


@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent {

    constructor(private http: HttpClient) {
    }

    buyConsultation() {
        const headers = new HttpHeaders({
            'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjZjYzNmY2I2NDAzMjc2MGVlYjljMjZmNzdkNDA3YTY5NGM1MmIwZTMiLCJ0eXAiOiJKV1QifQ.eyJyb2xlcyI6WyJBRE1JTl9VU0VSIl0sImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9maXItcG9jLWIxYTNkIiwiYXVkIjoiZmlyLXBvYy1iMWEzZCIsImF1dGhfdGltZSI6MTcyNzgxNTM3MSwidXNlcl9pZCI6IldyUnJHUGxNUmZnS0ZWZ0RCbEFFeFRlUFlLcTIiLCJzdWIiOiJXclJyR1BsTVJmZ0tGVmdEQmxBRXhUZVBZS3EyIiwiaWF0IjoxNzI3ODE1MzcxLCJleHAiOjE3Mjc4MTg5NzEsImVtYWlsIjoic3lzdGVtQGVtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJzeXN0ZW1AZW1haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.cvMPLXNV15f4HGwuwC7pVzXXm6irIAhoRmJDwAoxQNQt7tGLjj3dxERHkatzv0-IWSLf2F2oodn8lcxJPxhI634FaL8S2aYucUlUEOQPPyI6KnN1I8pcjjc-43TLPzul69_ApaVOvSRodkhRqda7CGDgSjaOR_47zcHPOErUwFG1EARDnF7moXLhwiTnBXzr3dIWIw3eYgl62WSrHZxbZ3nD8ckxrFamEZARVTveW2FalfWV0-onIE2DZZH5N589_CbP3RswB7jRwCAA-YCAP3aMO4ZxTtfj6XseehyUjea0Wh4A1Y2M7PQ9acuA2P6tqZqsAGBnaXyCQ1N4gPig1g`,
            'Content-Type': 'application/json' // Set content type if needed
        });

        const caseData = {
            title: 'Consultation Service',
            description: 'I am seeking legal advice regarding a contract dispute. The contract in question was signed on January 1st, 2023, and I believe there have been breaches of agreement by the other party. I need guidance on the next steps I should take and whether litigation is necessary.',
            caseType: 'OTHER',
            ipAddress: this.getIpAddress()
        };
        // Send the POST request to the backend to create an order
        this.http.post("/api/cases/basic", caseData, {headers}).subscribe(
            (response: any) => {
                const paymentLink = response.paymentOrder?.paymentLink;
                if (paymentLink) {
                    // Redirect to the payment link
                    window.location.href = paymentLink;
                } else {
                    console.error('Payment link not found in the response');
                }
            },
            (error) => {
                console.error('Error creating order:', error);
            }
        );
    }
    getIpAddress(): string {
        return '127.0.0.1';
    }

}
