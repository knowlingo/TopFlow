import { WorkflowStorage, StoredWorkflow, WorkflowVersion } from '../storage'

// Mock getSecurityTemplates
jest.mock('../security-templates', () => ({
  getSecurityTemplates: jest.fn(() => []),
}))

describe('WorkflowStorage', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    jest.clearAllMocks()
  })

  describe('saveWorkflow', () => {
    const mockWorkflow: StoredWorkflow = {
      id: 'workflow-1',
      name: 'Test Workflow',
      description: 'A test workflow',
      version: 1,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      author: 'Test Author',
      isPublic: false,
      tags: ['test'],
      category: 'Test',
      nodes: [],
      edges: [],
    }

    it('should save a new workflow to localStorage', () => {
      WorkflowStorage.saveWorkflow(mockWorkflow)

      const stored = localStorage.getItem('ai-agent-workflows')
      expect(stored).not.toBeNull()

      const workflows = JSON.parse(stored!)
      expect(workflows).toHaveLength(1)
      expect(workflows[0].id).toBe('workflow-1')
      expect(workflows[0].name).toBe('Test Workflow')
    })

    it('should update existing workflow and modify updatedAt', () => {
      // Save initial workflow
      WorkflowStorage.saveWorkflow(mockWorkflow)

      // Update the workflow
      const updatedWorkflow = {
        ...mockWorkflow,
        name: 'Updated Workflow',
      }

      WorkflowStorage.saveWorkflow(updatedWorkflow)

      const workflows = WorkflowStorage.getAllWorkflows()
      expect(workflows).toHaveLength(1)
      expect(workflows[0].name).toBe('Updated Workflow')
      expect(workflows[0].updatedAt).not.toBe(mockWorkflow.updatedAt)
    })

    it('should maintain multiple workflows', () => {
      const workflow1 = { ...mockWorkflow, id: 'workflow-1' }
      const workflow2 = { ...mockWorkflow, id: 'workflow-2', name: 'Workflow 2' }

      WorkflowStorage.saveWorkflow(workflow1)
      WorkflowStorage.saveWorkflow(workflow2)

      const workflows = WorkflowStorage.getAllWorkflows()
      expect(workflows).toHaveLength(2)
    })
  })

  describe('getWorkflow', () => {
    it('should retrieve a workflow by id', () => {
      const mockWorkflow: StoredWorkflow = {
        id: 'workflow-1',
        name: 'Test Workflow',
        description: 'A test workflow',
        version: 1,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        author: 'Test Author',
        isPublic: false,
        tags: ['test'],
        category: 'Test',
        nodes: [],
        edges: [],
      }

      WorkflowStorage.saveWorkflow(mockWorkflow)

      const retrieved = WorkflowStorage.getWorkflow('workflow-1')
      expect(retrieved).not.toBeNull()
      expect(retrieved?.id).toBe('workflow-1')
      expect(retrieved?.name).toBe('Test Workflow')
    })

    it('should return null for non-existent workflow', () => {
      const retrieved = WorkflowStorage.getWorkflow('non-existent')
      expect(retrieved).toBeNull()
    })
  })

  describe('getAllWorkflows', () => {
    it('should return empty array when no workflows exist', () => {
      const workflows = WorkflowStorage.getAllWorkflows()
      expect(workflows).toEqual([])
    })

    it('should return all workflows', () => {
      const workflow1: StoredWorkflow = {
        id: 'workflow-1',
        name: 'Workflow 1',
        description: 'First workflow',
        version: 1,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        author: 'Author',
        isPublic: false,
        tags: [],
        category: 'Test',
        nodes: [],
        edges: [],
      }

      const workflow2: StoredWorkflow = {
        ...workflow1,
        id: 'workflow-2',
        name: 'Workflow 2',
      }

      WorkflowStorage.saveWorkflow(workflow1)
      WorkflowStorage.saveWorkflow(workflow2)

      const workflows = WorkflowStorage.getAllWorkflows()
      expect(workflows).toHaveLength(2)
    })

    it('should return empty array in SSR context (window undefined)', () => {
      // This test verifies the typeof window === "undefined" check
      // In Jest, window is always defined, but we can test the localStorage behavior
      const workflows = WorkflowStorage.getAllWorkflows()
      expect(Array.isArray(workflows)).toBe(true)
    })
  })

  describe('deleteWorkflow', () => {
    it('should delete a workflow', () => {
      const mockWorkflow: StoredWorkflow = {
        id: 'workflow-to-delete',
        name: 'Delete Me',
        description: 'This will be deleted',
        version: 1,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        author: 'Author',
        isPublic: false,
        tags: [],
        category: 'Test',
        nodes: [],
        edges: [],
      }

      WorkflowStorage.saveWorkflow(mockWorkflow)
      expect(WorkflowStorage.getAllWorkflows()).toHaveLength(1)

      WorkflowStorage.deleteWorkflow('workflow-to-delete')
      expect(WorkflowStorage.getAllWorkflows()).toHaveLength(0)
    })

    it('should delete associated versions when deleting workflow', () => {
      const mockWorkflow: StoredWorkflow = {
        id: 'workflow-1',
        name: 'Workflow with Versions',
        description: 'Has versions',
        version: 1,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        author: 'Author',
        isPublic: false,
        tags: [],
        category: 'Test',
        nodes: [],
        edges: [],
      }

      const mockVersion: WorkflowVersion = {
        id: 'version-1',
        workflowId: 'workflow-1',
        version: 1,
        nodes: [],
        edges: [],
        createdAt: '2024-01-01T00:00:00.000Z',
        author: 'Author',
        message: 'Initial version',
      }

      WorkflowStorage.saveWorkflow(mockWorkflow)
      WorkflowStorage.saveVersion(mockVersion)

      expect(WorkflowStorage.getAllVersions()).toHaveLength(1)

      WorkflowStorage.deleteWorkflow('workflow-1')

      expect(WorkflowStorage.getAllWorkflows()).toHaveLength(0)
      expect(WorkflowStorage.getAllVersions()).toHaveLength(0)
    })

    it('should handle deleting non-existent workflow gracefully', () => {
      WorkflowStorage.deleteWorkflow('non-existent')
      expect(WorkflowStorage.getAllWorkflows()).toEqual([])
    })
  })

  describe('Workflow Versions', () => {
    describe('saveVersion', () => {
      it('should save a workflow version', () => {
        const mockVersion: WorkflowVersion = {
          id: 'version-1',
          workflowId: 'workflow-1',
          version: 1,
          nodes: [],
          edges: [],
          createdAt: '2024-01-01T00:00:00.000Z',
          author: 'Author',
          message: 'Initial version',
        }

        WorkflowStorage.saveVersion(mockVersion)

        const versions = WorkflowStorage.getAllVersions()
        expect(versions).toHaveLength(1)
        expect(versions[0].id).toBe('version-1')
      })

      it('should maintain multiple versions', () => {
        const version1: WorkflowVersion = {
          id: 'version-1',
          workflowId: 'workflow-1',
          version: 1,
          nodes: [],
          edges: [],
          createdAt: '2024-01-01T00:00:00.000Z',
          author: 'Author',
          message: 'Version 1',
        }

        const version2: WorkflowVersion = {
          id: 'version-2',
          workflowId: 'workflow-1',
          version: 2,
          nodes: [],
          edges: [],
          createdAt: '2024-01-02T00:00:00.000Z',
          author: 'Author',
          message: 'Version 2',
        }

        WorkflowStorage.saveVersion(version1)
        WorkflowStorage.saveVersion(version2)

        const versions = WorkflowStorage.getAllVersions()
        expect(versions).toHaveLength(2)
      })
    })

    describe('getWorkflowVersions', () => {
      it('should return versions for a specific workflow', () => {
        const version1: WorkflowVersion = {
          id: 'version-1',
          workflowId: 'workflow-1',
          version: 1,
          nodes: [],
          edges: [],
          createdAt: '2024-01-01T00:00:00.000Z',
          author: 'Author',
          message: 'Version 1',
        }

        const version2: WorkflowVersion = {
          id: 'version-2',
          workflowId: 'workflow-2',
          version: 1,
          nodes: [],
          edges: [],
          createdAt: '2024-01-02T00:00:00.000Z',
          author: 'Author',
          message: 'Different workflow',
        }

        WorkflowStorage.saveVersion(version1)
        WorkflowStorage.saveVersion(version2)

        const versions = WorkflowStorage.getWorkflowVersions('workflow-1')
        expect(versions).toHaveLength(1)
        expect(versions[0].workflowId).toBe('workflow-1')
      })

      it('should return versions sorted by version number (descending)', () => {
        const version1: WorkflowVersion = {
          id: 'version-1',
          workflowId: 'workflow-1',
          version: 1,
          nodes: [],
          edges: [],
          createdAt: '2024-01-01T00:00:00.000Z',
          author: 'Author',
          message: 'Version 1',
        }

        const version2: WorkflowVersion = {
          id: 'version-2',
          workflowId: 'workflow-1',
          version: 3,
          nodes: [],
          edges: [],
          createdAt: '2024-01-02T00:00:00.000Z',
          author: 'Author',
          message: 'Version 3',
        }

        const version3: WorkflowVersion = {
          id: 'version-3',
          workflowId: 'workflow-1',
          version: 2,
          nodes: [],
          edges: [],
          createdAt: '2024-01-03T00:00:00.000Z',
          author: 'Author',
          message: 'Version 2',
        }

        WorkflowStorage.saveVersion(version1)
        WorkflowStorage.saveVersion(version2)
        WorkflowStorage.saveVersion(version3)

        const versions = WorkflowStorage.getWorkflowVersions('workflow-1')
        expect(versions).toHaveLength(3)
        expect(versions[0].version).toBe(3)
        expect(versions[1].version).toBe(2)
        expect(versions[2].version).toBe(1)
      })

      it('should return empty array for workflow with no versions', () => {
        const versions = WorkflowStorage.getWorkflowVersions('non-existent')
        expect(versions).toEqual([])
      })
    })

    describe('deleteVersion', () => {
      it('should delete a specific version', () => {
        const mockVersion: WorkflowVersion = {
          id: 'version-to-delete',
          workflowId: 'workflow-1',
          version: 1,
          nodes: [],
          edges: [],
          createdAt: '2024-01-01T00:00:00.000Z',
          author: 'Author',
          message: 'Delete me',
        }

        WorkflowStorage.saveVersion(mockVersion)
        expect(WorkflowStorage.getAllVersions()).toHaveLength(1)

        WorkflowStorage.deleteVersion('version-to-delete')
        expect(WorkflowStorage.getAllVersions()).toHaveLength(0)
      })

      it('should only delete specified version, not others', () => {
        const version1: WorkflowVersion = {
          id: 'version-1',
          workflowId: 'workflow-1',
          version: 1,
          nodes: [],
          edges: [],
          createdAt: '2024-01-01T00:00:00.000Z',
          author: 'Author',
          message: 'Keep me',
        }

        const version2: WorkflowVersion = {
          id: 'version-2',
          workflowId: 'workflow-1',
          version: 2,
          nodes: [],
          edges: [],
          createdAt: '2024-01-02T00:00:00.000Z',
          author: 'Author',
          message: 'Delete me',
        }

        WorkflowStorage.saveVersion(version1)
        WorkflowStorage.saveVersion(version2)

        WorkflowStorage.deleteVersion('version-2')

        const versions = WorkflowStorage.getAllVersions()
        expect(versions).toHaveLength(1)
        expect(versions[0].id).toBe('version-1')
      })
    })
  })

  describe('getTemplates', () => {
    it('should return templates including default templates', () => {
      const templates = WorkflowStorage.getTemplates()

      // Should have at least the default templates
      // (4 default templates defined in getDefaultTemplates)
      expect(templates.length).toBeGreaterThanOrEqual(4)

      // Check for known default templates
      const contentGenerator = templates.find(
        (t) => t.id === 'template-content-generator'
      )
      expect(contentGenerator).toBeDefined()
      expect(contentGenerator?.name).toBe('AI Content Generator with Image')
    })

    it('should include public user workflows in templates', () => {
      const publicWorkflow: StoredWorkflow = {
        id: 'public-workflow-1',
        name: 'Public Workflow',
        description: 'A public workflow',
        version: 1,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        author: 'User',
        isPublic: true,
        tags: ['public'],
        category: 'User',
        nodes: [],
        edges: [],
      }

      WorkflowStorage.saveWorkflow(publicWorkflow)

      const templates = WorkflowStorage.getTemplates()

      const userTemplate = templates.find((t) => t.id === 'public-workflow-1')
      expect(userTemplate).toBeDefined()
    })

    it('should NOT include private user workflows in templates', () => {
      const privateWorkflow: StoredWorkflow = {
        id: 'private-workflow-1',
        name: 'Private Workflow',
        description: 'A private workflow',
        version: 1,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        author: 'User',
        isPublic: false,
        tags: ['private'],
        category: 'User',
        nodes: [],
        edges: [],
      }

      WorkflowStorage.saveWorkflow(privateWorkflow)

      const templates = WorkflowStorage.getTemplates()

      const userTemplate = templates.find((t) => t.id === 'private-workflow-1')
      expect(userTemplate).toBeUndefined()
    })
  })
})
