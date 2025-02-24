import { describe, it, beforeEach, expect } from "vitest"

describe("Conceptual Incompatibility Resolution Contract", () => {
  let mockStorage: Map<string, any>
  let nextIncompatibilityId: number
  
  beforeEach(() => {
    mockStorage = new Map()
    nextIncompatibilityId = 0
  })
  
  const mockContractCall = (method: string, args: any[] = [], sender = "default-sender") => {
    switch (method) {
      case "register-incompatibility":
        const [concept1, concept2, resolutionStrategy] = args
        nextIncompatibilityId++
        mockStorage.set(`incompatibility-${nextIncompatibilityId}`, {
          concept_1: concept1,
          concept_2: concept2,
          resolution_strategy: resolutionStrategy,
          status: "registered",
        })
        return { success: true, value: nextIncompatibilityId }
      case "update-incompatibility-status":
        const [incompatibilityId, newStatus] = args
        const incompatibility = mockStorage.get(`incompatibility-${incompatibilityId}`)
        if (!incompatibility) return { success: false, error: 404 }
        incompatibility.status = newStatus
        return { success: true }
      case "get-incompatibility":
        return { success: true, value: mockStorage.get(`incompatibility-${args[0]}`) }
      case "get-all-incompatibilities":
        return {
          success: true,
          value: Array.from(mockStorage.entries()).map(([key, value]) => ({
            id: Number(key.split("-")[1]),
            ...value,
          })),
        }
      default:
        return { success: false, error: "Unknown method" }
    }
  }
  
  it("should register an incompatibility", () => {
    const result = mockContractCall("register-incompatibility", ["Free will", "Determinism", "Compatibilism"])
    expect(result.success).toBe(true)
    expect(result.value).toBe(1)
  })
  
  it("should update incompatibility status", () => {
    mockContractCall("register-incompatibility", ["Free will", "Determinism", "Compatibilism"])
    const result = mockContractCall("update-incompatibility-status", [1, "resolved"])
    expect(result.success).toBe(true)
  })
  
  it("should get incompatibility info", () => {
    mockContractCall("register-incompatibility", ["Free will", "Determinism", "Compatibilism"])
    const result = mockContractCall("get-incompatibility", [1])
    expect(result.success).toBe(true)
    expect(result.value).toEqual({
      concept_1: "Free will",
      concept_2: "Determinism",
      resolution_strategy: "Compatibilism",
      status: "registered",
    })
  })
  
  it("should get all incompatibilities", () => {
    mockContractCall("register-incompatibility", ["Free will", "Determinism", "Compatibilism"])
    mockContractCall("register-incompatibility", ["Wave", "Particle", "Wave-particle duality"])
    const result = mockContractCall("get-all-incompatibilities")
    expect(result.success).toBe(true)
    expect(result.value).toHaveLength(2)
    expect(result.value[0].concept_1).toBe("Free will")
    expect(result.value[1].concept_1).toBe("Wave")
  })
})

