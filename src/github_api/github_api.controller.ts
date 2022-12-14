import { Controller, Get, Query, Param } from '@nestjs/common';
import { GithubApiService } from './github_api.service';
import { Branch } from './branch/branch';
import { Commit } from './commit/commit'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
  ApiParam
} from '@nestjs/swagger';

@Controller('github')
export class GithubApiController {

  constructor(private githubApiService: GithubApiService) {}

  @Get('branches')
  @ApiTags('branches')
  @ApiQuery({ name: 'repository' })
  @ApiResponse({
    status: 200,
    description: 'Github repository branches',
    type: Branch
  })
  getBranches(@Query('repository') repository: string): Promise<Branch[]> {
    return this.githubApiService.listRepositoryBranches(repository)
  }

  @Get('branches/:branch')
  @ApiTags('branches')
  @ApiParam({ name: 'branch' })
  @ApiQuery({ name: 'repository' })
  @ApiQuery({ name: 'page' })
  @ApiQuery({ name: 'per_page' })
  @ApiResponse({
    status: 200,
    description: 'Github repository commit list',
    type: Commit,
  })
  getBranchCommits(@Param() param, @Query() query: { repository: string, page: number, per_page: number}): Promise<Commit[]> {
    return this.githubApiService.listBranchCommits(query.repository, param.branch, query.page, query.per_page)
  }
}
