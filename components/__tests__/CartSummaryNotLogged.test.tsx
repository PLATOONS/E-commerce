import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartSummary from "@/components/CartSummary";

// Mock Next.js useRouter
const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("CartSummary Checkout Button without logged-in user", () => {
  beforeEach(() => {
    pushMock.mockClear();
    sessionStorage.clear();
  });

  test("redirects to login page when pressing Buy button without token", async () => {
    const subtotal = 100;

    
    render(<CartSummary subtotal={subtotal} />);


    const checkoutButton = screen.getByRole("button", { name: /checkout/i });
    await userEvent.click(checkoutButton);


    expect(pushMock).toHaveBeenCalledWith("/login");
  });
});
