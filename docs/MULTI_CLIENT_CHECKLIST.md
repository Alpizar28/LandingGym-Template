# Multi-Client Setup Checklist

Follow these steps to setup a new client landing page in your white-label system.

## 1. Sanity Studio Setup

### Step 1: Create a Brand
- Navigate to the **Brand** document type.
- Create a new document.
- **Name**: Client name (e.g., "Power Gym").
- **Colors**: Define Primary, Secondary, Background, and Text colors.
- **Typography**: Set font families.
- **Save and Publish**.

### Step 2: Create Hero Content
- Navigate to **Hero Section Content**.
- Create a new document.
- Fill in the **Headline**, **Subheadline**, and **CTA** details.
- **Save and Publish**.

### Step 3: Create Generic Sections
- Navigate to **Generic Section**.
- Create as many sections as needed (e.g., "Services", "Testimonials").
- Fill in **Title**, **Body**, and **Image**.
- **Important**: You don't select the variant here, you define the *content*.
- **Save and Publish**.

### Step 4: Create the Landing Page
- Navigate to **Landing Page**.
- Create a new document.
- **Slug**: This will be the URL path (e.g., `powergym`).
- **Is Active**: Must be toggled ON.
- **Brand**: Reference the Brand created in Step 1.
- **Sections**:
    - Add a section item.
    - **Key**: Select "Home / Hero".
    - **Content Reference**: Select the Hero content document.
    - Add more sections using the "Generic Section" key.
    - **Variant**: Select the layout style (Services, About, etc.).
    - **Content Reference**: Select a Generic Section document.
- **Save and Publish**.

## 2. Frontend Verification

- Visit `http://localhost:3000/[slug]` (replace `[slug]` with the specific client's slug).
- **Check Theme**: Verify colors match the Brand configuration.
- **Check Layouts**: Verify Generic Sections render with the selected variants.
- **Check Sorting**: Rearrange sections in Sanity and refresh to see the change.
- **Check Visibility**: Toggle a section's "Enabled" status to hide/show it.

## 3. Common Troubleshooting

- **404 Not Found**: Ensure the Landing Page's **Slug** matches the URL and **Is Active** is toggled ON.
- **Missing Section**: Ensure the section in the `sections` array has a **Key** selected, **Content Reference** linked, and is **Enabled**.
- **White Page**: Ensure you ran `npm run dev` and Sanity Studio has published changes.
