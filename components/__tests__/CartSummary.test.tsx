import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartSummary from '../CartSummary';


// Mock validateJWT to always return true
jest.mock('../../utils/jwtUtils', () => ({
  validateJWT: jest.fn(() => true),
}));

// Mock Next.js useRouter
const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: pushMock,
    }),
}));

describe('CartSummary Checkout Button with logged-in user', () => {
    beforeEach(() => {
        pushMock.mockClear();
        // Simulate logged-in user by setting a token in sessionStorage
        sessionStorage.setItem('token', 'random-string-token-123');
    });

    afterEach(() => {
        sessionStorage.clear();
    });

    const shippingOptions = [
        { label: 'Free Shipping', query: 'free' },
        { label: 'Express Shipping', query: 'express' },
        { label: 'PickUp', query: 'pickup' },
    ];

    test.each(shippingOptions)(
        'redirects to checkout with %s when clicking Buy button',
        async ({ label, query }) => {
            const subtotal = 100;

            render(<CartSummary subtotal={subtotal} />);

            // Select the shipping type if it's not "Free Shipping"
            if (query !== 'free') {
                const radio = screen.getByLabelText(new RegExp(label, 'i'));
                await userEvent.click(radio);
            }

            // Click the Checkout button
            const checkoutButton = screen.getByRole('button', { name: /checkout/i });
            await userEvent.click(checkoutButton);

            // Verify router.push was called with the correct URL
            expect(pushMock).toHaveBeenCalledWith(`/checkout?page=1&shipping=${query}`);

            // Verify the token still exists in sessionStorage
            expect(sessionStorage.getItem('token')).toBe('random-string-token-123');
        }
    );
});
