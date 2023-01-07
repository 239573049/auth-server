namespace Simple;

public static class SimpleDomainErrorCodes
{
    private const string Default = "Simple:";

    /// <summary>
    /// 账号或手机号重复
    /// </summary>
    public const string AccountDuplication = Default + "AccountDuplication";

    /// <summary>
    /// 数据未找到
    /// </summary>
    public const string DataNotFound = Default + "DataNotFound";

}
