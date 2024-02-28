import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'

import UserForm from './UserForm'


// Test structure
test('It shows 2 inputs and 1 button', () => {
    // 1- Render the component
    render(<UserForm/>)

    // 2- Manipulate the componente a/o find an element in it
    const inputs = screen.getAllByRole('textbox')
    const button = screen.getByRole('button')

    // 3- Make Assertions, make sure the component is doing what we want to
    expect(inputs).toHaveLength(2)
    expect(button).toBeInTheDocument()
})

test('It calls onUserAdd when the form is submitted', async () => {

    const mockFn = jest.fn()

    render(<UserForm onUserAdd={mockFn}/>)

    // Find the two inputs
    const nameInput = screen.getByRole('textbox', {name: /name/i})
    const emailInput = screen.getByRole('textbox', {name: /email/i})

    // Simulate typing in a name
    await user.click(nameInput)
    await user.keyboard('jane')

    // Simulate typing in an email
    await user.click(emailInput)
    await user.keyboard('jane@jane.com')

    // Find the button
    const button = screen.getByRole('button')

    // Click the button
    await user.click(button)

    // Assertion to make sure 'onUserAdd' gets called with email/name
    expect(mockFn).toHaveBeenCalled()
    expect(mockFn).toHaveBeenCalledWith({name: 'jane', email: 'jane@jane.com'})
})

test('It empties the two inputs when form is submitted', async () => {
    render(<UserForm onUserAdd={() => {}}/>)

    const nameInput = screen.getByRole('textbox', { name: /name/i })
    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const button = screen.getByRole('button')

    await user.click(nameInput)
    await user.keyboard('jane')

    await user.click(emailInput)
    await user.keyboard('jane@jane.com')

    await user.click(button)

    expect(nameInput).toHaveValue('')
    expect(emailInput).toHaveValue('')
})