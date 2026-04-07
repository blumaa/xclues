import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { BrandThemeSwitcher } from '../organisms/BrandThemeSwitcher';
import { BRAND_NAMES } from '../../hooks/useTheme';

const mockSetBrandTheme = vi.fn();

vi.mock('../../providers/useThemeContext', () => ({
  useThemeContext: vi.fn(() => ({
    brandTheme: 'xclues',
    setBrandTheme: mockSetBrandTheme,
  })),
}));

import { useThemeContext } from '../../providers/useThemeContext';
const mockUseThemeContext = vi.mocked(useThemeContext);

describe('BrandThemeSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseThemeContext.mockReturnValue({
      brandTheme: 'xclues',
      setBrandTheme: mockSetBrandTheme,
      theme: 'light',
      isDarkMode: false,
      setTheme: vi.fn(),
      toggleTheme: vi.fn(),
    });
  });

  it('renders a button with aria-label showing the next theme', () => {
    const { getByRole } = render(<BrandThemeSwitcher />);
    const button = getByRole('button');
    // xclues is index 0, next is index 1 (superhuman)
    expect(button).toHaveAttribute('aria-label', `Switch to ${BRAND_NAMES[1]} theme`);
  });

  it('renders a button with correct aria-label for last theme (wraps to first)', () => {
    const lastBrand = BRAND_NAMES[BRAND_NAMES.length - 1];
    mockUseThemeContext.mockReturnValue({
      brandTheme: lastBrand,
      setBrandTheme: mockSetBrandTheme,
      theme: 'light',
      isDarkMode: false,
      setTheme: vi.fn(),
      toggleTheme: vi.fn(),
    });

    const { getByRole } = render(<BrandThemeSwitcher />);
    const button = getByRole('button');
    expect(button).toHaveAttribute('aria-label', `Switch to ${BRAND_NAMES[0]} theme`);
  });

  it('renders a palette icon SVG', () => {
    const { container } = render(<BrandThemeSwitcher />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('cycles to the next brand when clicked', () => {
    const { getByRole } = render(<BrandThemeSwitcher />);
    fireEvent.click(getByRole('button'));
    // xclues is index 0, so next should be index 1
    expect(mockSetBrandTheme).toHaveBeenCalledWith(BRAND_NAMES[1]);
  });

  it('wraps around to the first brand after the last', () => {
    const lastBrand = BRAND_NAMES[BRAND_NAMES.length - 1];
    mockUseThemeContext.mockReturnValue({
      brandTheme: lastBrand,
      setBrandTheme: mockSetBrandTheme,
      theme: 'light',
      isDarkMode: false,
      setTheme: vi.fn(),
      toggleTheme: vi.fn(),
    });

    const { getByRole } = render(<BrandThemeSwitcher />);
    fireEvent.click(getByRole('button'));
    expect(mockSetBrandTheme).toHaveBeenCalledWith(BRAND_NAMES[0]);
  });
});
