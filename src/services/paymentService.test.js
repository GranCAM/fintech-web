import { sendQrPayment } from './paymentService'

describe('sendQrPayment', () => {
    beforeEach(() => {
        global.fetch = jest.fn()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('debe enviar los datos correctamente y devolver el resultado', async () => {
        const mockResponse = { success: true, message: 'Pago procesado' }

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        })

        const result = await sendQrPayment({ amount: 42.5, description: 'Café' })

        expect(fetch).toHaveBeenCalledWith('/api/process-payment', expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: 42.5, description: 'Café' }),
        }))

        expect(result).toEqual(mockResponse)
    })

    it('debe lanzar error si el servidor responde con error', async () => {
        const mockError = { message: 'Fallo de validación' }

        fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => mockError,
        })

        await expect(sendQrPayment({ amount: 100, description: 'Error test' }))
            .rejects
            .toThrow('Fallo de validación')
    })

    it('debe lanzar error si ocurre un fallo de red', async () => {
        fetch.mockRejectedValueOnce(new Error('Network error'))

        await expect(sendQrPayment({ amount: 10, description: 'Red' }))
            .rejects
            .toThrow('Network error')
    })
})
