import { dashboardRepository } from "../repositories/dashboard.repository";

export const dashboardService = {
  overview: () => dashboardRepository.overview(),
};
