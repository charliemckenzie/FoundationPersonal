# Team relationship map

> Moved out of `AGENTS.md` to keep the always-on context lean. This is on-demand reference. The routing table, pipeline sequence, and agent roles remain in `AGENTS.md`.

Solid arrows = mandatory pipeline steps. Dashed arrows = optional or off-pipeline relationships.

```mermaid
flowchart TD
    D([Designer]) --> S[Smithers\nCoordinator]

    S -->|component request| Moe[Moe\nDesign System]
    S -->|backend work| C[Carl\nBackend Dev]
    S -.->|design + prototype| M[Milhouse\nDesign Contractor]
    S -->|onboarding| T[Troy McClure\nOnboarding]
    S -.->|blocked from repo| B[Sideshow Bob\nAsync Planning]

    M -.->|prototype informs| Moe
    Moe -->|approved| L[Lenny\nFrontend Dev]
    L --> Ch[Chalmers\nCode Quality]
    C --> Ch

    Ch --> Fl[Flanders\nAccessibility]
    Fl --> Ma[Marge\nVisual Consistency]
    Ma --> Li[Lisa\nDocumentation]
    Li --> W[Willie\nStatus Gatekeeper]
    W --> Fr[Frink\nVersion Control]
    Fr --> D

    Moe <-.->|standing team| Li
    B -.->|planning doc| D

    style M stroke-dasharray: 5 5
    style B stroke-dasharray: 5 5
    style T stroke-dasharray: 5 5
```
